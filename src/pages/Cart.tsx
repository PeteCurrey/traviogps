import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <PageWrapper>
      <section className="pt-28 pb-2 bg-background">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/products" className="hover:text-foreground transition-colors">Store</Link>
            <span>/</span>
            <span className="text-foreground">Cart</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-premium max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-display-3 text-foreground mb-8">
              Shopping <span className="italic-accent">Cart</span>
            </h1>

            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
                <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
                <Button asChild className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/products">Browse Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 md:gap-6 p-4 md:p-6 bg-card rounded-sm border border-border">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary/20 rounded-sm flex items-center justify-center flex-shrink-0 border border-border">
                        <item.product.icon className="w-10 h-10 text-accent/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${item.product.slug}`} className="font-serif text-base md:text-lg text-foreground hover:text-accent transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                        {item.product.subscriptionPrice && (
                          <p className="text-xs text-muted-foreground mt-1">+ {item.product.subscriptionPrice} subscription</p>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-foreground text-lg">
                              £{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-card rounded-sm border border-border p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">£{totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-accent">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium border-t border-border pt-4">
                    <span>Total</span>
                    <span>£{totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button asChild size="lg" className="flex-1 btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link to="/checkout">Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <Button asChild variant="ghost">
                    <Link to="/products">← Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Cart;
