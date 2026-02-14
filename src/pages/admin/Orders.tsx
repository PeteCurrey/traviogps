import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  {
    label: "Total Orders",
    value: "—",
    icon: ShoppingCart,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Revenue",
    value: "—",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Pending",
    value: "—",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Fulfilled",
    value: "—",
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

export default function Orders() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-foreground">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and fulfilment
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  stat.bgColor
                )}
              >
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
            <p className="font-serif text-3xl text-foreground mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-sm p-12 text-center"
      >
        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-serif text-lg text-foreground mb-2">
          Order Management Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Orders placed through Stripe checkout will appear here. Connect your
          payment dashboard to view and manage all customer orders.
        </p>
      </motion.div>
    </div>
  );
}
