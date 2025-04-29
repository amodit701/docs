import type React from "react"
import { cn } from "@/lib/utils"

interface IntegrationStepProps {
  number: number
  title: string
  children: React.ReactNode
  isImportant?: boolean
}

export function IntegrationStep({ number, title, children, isImportant = false }: IntegrationStepProps) {
  return (
    <div
      className={cn(
        "my-8 rounded-lg border p-6 transition-all",
        isImportant && "border-primary/30 bg-primary/5 shadow-sm",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium",
            isImportant ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {number}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight">{title}</h3>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}
