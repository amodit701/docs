import type React from "react"
import { AlertCircle } from "lucide-react"

interface ImportantNoteProps {
  children: React.ReactNode
}

export function ImportantNote({ children }: ImportantNoteProps) {
  return (
    <div className="my-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
      <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
