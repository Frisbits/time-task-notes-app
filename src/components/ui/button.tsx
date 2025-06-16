
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-comfortaa",
  {
    variants: {
      variant: {
        default: "bg-md-sys-color-primary text-md-sys-color-on-primary hover:shadow-md hover:scale-105 transition-transform font-medium",
        destructive:
          "bg-md-sys-color-error text-md-sys-color-on-error hover:bg-md-sys-color-error/90 font-medium",
        outline:
          "border border-md-sys-color-outline bg-md-sys-color-surface text-md-sys-color-on-surface hover:bg-md-sys-color-primary/10 font-medium",
        secondary:
          "bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container hover:bg-md-sys-color-secondary-container/80 font-medium",
        ghost: "hover:bg-md-sys-color-surface-variant text-md-sys-color-on-surface font-normal",
        link: "text-md-sys-color-primary underline-offset-4 hover:underline font-normal",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-full px-4",
        lg: "h-14 rounded-full px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
