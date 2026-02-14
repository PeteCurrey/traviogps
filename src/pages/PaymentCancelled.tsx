import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancelled = () => {
  return (
    <PageWrapper>
      <section className="pt-32 lg:pt-40 pb-20 bg-background">
        <div className="container-premium text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <XCircle className="h-20 w-20 text-muted-foreground/40 mx-auto mb-6" />
            <h1 className="font-serif text-display-3 text-foreground mb-4">
              Payment <span className="italic-accent">Cancelled</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your payment was not completed. Your cart items are still saved —
              you can try again whenever you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PaymentCancelled;
