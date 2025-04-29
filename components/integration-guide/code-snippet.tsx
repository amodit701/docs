"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CodeSnippetProps {
  code: string
  language?: string
}

export function CodeSnippet({ code, language = "bash" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border bg-muted font-mono text-sm">
      <div className="absolute right-2 top-2 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <SyntaxHighlighter
        language={language}
        style={nord}
        customStyle={{ margin: 0, background: "transparent" }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
