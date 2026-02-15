import * as React from "react"
import { cn } from "@/lib/utils"

const GlassCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        variant?: "default" | "hoverable" | "panel"
    }
>(({ className, variant = "default", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300",
                variant === "hoverable" && "hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] hover:shadow-purple-500/10 cursor-pointer",
                variant === "panel" && "bg-slate-950/30 backdrop-blur-2xl border-white/5",
                className
            )}
            {...props}
        />
    )
})
GlassCard.displayName = "GlassCard"

export { GlassCard }
