import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { items, totalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: items.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageWrapper>
        <section className="pt-32 lg:pt-40 section-padding bg-background text-center">
          <div className="container-premium">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
            <h1 className="font-serif text-display-3 text-foreground mb-4">Your cart is empty</h1>
            <Button asChild variant="outline">
              <Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Link>
            </Button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="pt-28 pb-2 bg-background">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/products" className="hover:text-foreground transition-colors">Store</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-foreground">Checkout</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-display-3 text-foreground mb-8">
              <span className="italic-accent">Checkout</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-sm border border-border p-6">
                  <h2 className="font-serif text-xl text-foreground mb-4">Contact Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-sm border border-border p-6">
                  <h2 className="font-serif text-xl text-foreground mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} required className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isLoading ? (
                    "Redirecting to payment..."
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Pay £{totalPrice().toFixed(2)}
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Stripe. Your details are encrypted.
                </p>
              </form>

              <div className="lg:col-span-1">
                <div className="sticky top-40 bg-card rounded-sm border border-border p-6 space-y-4">
                  <h2 className="font-serif text-xl text-foreground mb-2">Order Summary</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium ml-4">£{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>£{totalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-accent">FREE</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t border-border pt-3">
                      <span>Total</span>
                      <span>£{totalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Checkout;
