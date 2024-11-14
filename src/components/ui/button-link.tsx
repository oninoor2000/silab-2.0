import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const linkVariants = cva(
  "inline-flex items-center content-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 flex items-center justify-center",
        sm: "h-9 rounded-md px-3 flex items-center justify-center",
        lg: "h-11 rounded-md px-8 flex items-center justify-center",
        icon: "h-10 w-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  children: React.ReactNode;
}

export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
ButtonLink.displayName = "Link";

export { ButtonLink, linkVariants };
