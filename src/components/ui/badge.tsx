import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Sandbox badge
        sandbox: "border-sandbox/30 bg-sandbox-muted text-sandbox font-medium",
        "sandbox-solid": "border-transparent bg-sandbox text-sandbox-foreground",
        // Success/Live badge
        success: "border-success/30 bg-success-muted text-success font-medium",
        "success-solid": "border-transparent bg-success text-success-foreground",
        // Status badges
        live: "border-transparent bg-success text-success-foreground",
        preview: "border-sandbox/30 bg-sandbox-muted text-sandbox",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
