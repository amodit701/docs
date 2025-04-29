"use client"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import Link from "next/link"

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="mt-10 mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="mt-8 mb-3 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="mt-6 mb-2 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
        ),
        p: ({ node, ...props }) => <p className="mb-4 leading-7 [&:not(:first-child)]:mt-6" {...props} />,
        a: ({ node, href, ...props }) => {
          if (href?.startsWith("/")) {
            return <Link href={href} className="font-medium text-primary underline underline-offset-4" {...props} />
          }
          return (
            <a
              href={href}
              className="font-medium text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          )
        },
        ul: ({ node, ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
        li: ({ node, ...props }) => <li className="leading-7" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              style={nord}
              language={match[1]}
              PreTag="div"
              className="my-6 rounded-lg border"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
              {...props}
            >
              {children}
            </code>
          )
        },
        table: ({ node, ...props }) => (
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="border-b" {...props} />,
        tr: ({ node, ...props }) => <tr className="m-0 border-t p-0 even:bg-muted" {...props} />,
        th: ({ node, ...props }) => (
          <th
            className="border px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
            {...props}
          />
        ),
        hr: ({ node, ...props }) => <hr className="my-6 border-muted-foreground/20" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
