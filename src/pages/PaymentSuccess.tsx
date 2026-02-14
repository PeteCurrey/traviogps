import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-20 bg-background">
        <div className="container-premium text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="h-20 w-20 text-accent mx-auto mb-6" />
            <h1 className="font-serif text-display-3 text-foreground mb-4">
              Payment <span className="italic-accent">Successful</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for your order! You'll receive a confirmation email
              shortly with your order details and tracking information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/products">
                  Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PaymentSuccess;
