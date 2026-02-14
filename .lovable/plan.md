
# Stripe Payment Integration for GPS Tracker Store

## What We're Building
Connect real Stripe payments to the existing checkout flow so customers can pay for GPS trackers with their credit/debit card. When a customer clicks "Pay" on the checkout page, they'll be redirected to Stripe's secure hosted checkout page to complete payment, then redirected back to a success or cancellation page.

## How It Works

1. Customer adds products to cart and proceeds to checkout
2. On the checkout page, clicking "Pay" sends the cart items to a backend function
3. The backend function creates a Stripe Checkout Session with all the cart items
4. Customer is redirected to Stripe's secure payment page
5. After payment, customer returns to a success page and the cart is cleared

## Implementation Steps

### 1. Create the Backend Payment Function
A new backend function called `create-checkout` that:
- Receives the cart items (product name, price, quantity) from the frontend
- Also receives customer details (name, email, address) collected on the checkout form
- Creates a Stripe Checkout Session in `payment` mode with GBP currency
- Uses `price_data` for dynamic line items (since we have 24+ products with prices defined in the frontend data)
- Sets success and cancel redirect URLs
- Returns the Stripe Checkout URL to the frontend
- Supports guest checkout (no login required)

### 2. Update the Checkout Page
Modify the existing checkout page to:
- Send cart items and customer details to the `create-checkout` function when the form is submitted
- Show a loading state while the Stripe session is being created
- Redirect the customer to Stripe Checkout on success
- Handle and display errors if something goes wrong

### 3. Create Success and Cancel Pages
- **Payment Success page** (`/payment-success`): Shows an order confirmation message and clears the cart
- **Payment Cancelled page** (`/payment-cancelled`): Lets the customer know they can try again, with a link back to the cart

### 4. Add Routes
Register the two new pages (`/payment-success` and `/payment-cancelled`) in the app router.

## Technical Details

### Edge Function: `create-checkout`
- Located at `supabase/functions/create-checkout/index.ts`
- Uses Stripe SDK to create a Checkout Session
- Passes cart line items dynamically using `price_data` (product name + unit amount in pence)
- Sets `shipping_address_collection` for UK delivery
- Attaches customer email from the checkout form
- No authentication required (guest checkout)
- CORS headers included for browser requests
- JWT verification disabled in config.toml

### Frontend Changes
- **`src/pages/Checkout.tsx`**: Update `handleSubmit` to call the edge function via `supabase.functions.invoke()`, then redirect to `session.url`
- **`src/pages/PaymentSuccess.tsx`**: New page with order confirmation, clears cart on mount
- **`src/pages/PaymentCancelled.tsx`**: New page with retry options
- **`src/App.tsx`**: Add routes for `/payment-success` and `/payment-cancelled`
- **`supabase/config.toml`**: Add `[functions.create-checkout]` with `verify_jwt = false`

### Security Considerations
- Stripe secret key is already stored as a secret (STRIPE_SECRET_KEY)
- Prices are validated server-side (sent from frontend but could be cross-checked)
- Stripe handles all card data -- no sensitive payment info touches our servers
- CORS headers restrict allowed request headers
