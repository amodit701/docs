import { notFound } from "next/navigation"

import { documentSections } from "@/config/integrations"
import { IntegrationGuideLayout } from "@/components/integration-guide/layout"
import { Markdown } from "@/components/ui/markdown"

interface SectionPageProps {
  params: {
    section: string
  }
}

export function generateStaticParams() {
  return documentSections.map((section) => ({
    section: section.id,
  }))
}

export default function SectionPage({ params }: SectionPageProps) {
  const section = documentSections.find((s) => s.id === params.section)

  if (!section) {
    notFound()
  }

  return (
    <IntegrationGuideLayout>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <section.icon className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight font-heading">{section.name}</h1>
        </div>
        <p className="text-xl text-muted-foreground">{section.description}</p>
      </div>
      <div className="mt-8">
        <Markdown content={section.content} className="prose prose-slate dark:prose-invert max-w-none" />
      </div>
    </IntegrationGuideLayout>
  )
}
