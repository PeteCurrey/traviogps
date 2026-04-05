"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import { useState } from "react";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();
  const [open, setOpen] = useState(false);
  const count = totalItems();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 text-foreground/80 hover:text-primary transition-colors" aria-label="Shopping cart">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Shopping Cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-secondary/20 rounded-sm border border-border">
                  <div className="w-16 h-16 bg-card rounded-sm flex items-center justify-center flex-shrink-0 border border-border">
                    <item.product.icon className="w-8 h-8 text-accent/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">
                          £{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {item.product.subscriptionPrice && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        + {item.product.subscriptionPrice} subscription
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">£{totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-accent">FREE</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-border pt-3">
                <span>Total</span>
                <span>£{totalPrice().toFixed(2)}</span>
              </div>
              <Button
                className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setOpen(false)} asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
