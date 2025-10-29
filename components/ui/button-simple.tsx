import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    let baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    if (size === "sm") {
      baseClasses += " h-9 px-3 text-sm"
    } else if (size === "icon") {
      baseClasses += " h-10 w-10"
    } else {
      baseClasses += " h-10 px-4 py-2"
    }

    if (variant === "ghost") {
      baseClasses += " hover:bg-accent hover:text-accent-foreground"
    } else if (variant === "outline") {
      baseClasses += " border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    } else {
      baseClasses += " bg-primary text-primary-foreground hover:bg-primary/90"
    }

    return <button className={`${baseClasses} ${className}`} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button }
