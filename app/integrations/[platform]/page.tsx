import Image from "next/image"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"

import { integrations } from "@/config/integrations"
import { CodeSnippet } from "@/components/integration-guide/code-snippet"
import { ImportantNote } from "@/components/integration-guide/important-note"
import { IntegrationStep } from "@/components/integration-guide/integration-step"
import { IntegrationGuideLayout } from "@/components/integration-guide/layout"
import { Screenshot } from "@/components/integration-guide/screenshot"

interface PlatformPageProps {
  params: {
    platform: string
  }
}

export function generateStaticParams() {
  return integrations.map((integration) => ({
    platform: integration.id,
  }))
}

export default function PlatformPage({ params }: PlatformPageProps) {
  const integration = integrations.find((i) => i.id === params.platform)

  if (!integration) {
    notFound()
  }

  return (
    <IntegrationGuideLayout>
      <div className="mb-10 flex items-center gap-6">
        <Image
          src={integration.icon || "/placeholder.svg"}
          alt={`${integration.name} logo`}
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-heading">{integration.name}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{integration.description}</p>
        </div>
      </div>

      <div className="mb-10 rounded-lg border bg-muted/30 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
        <ul className="mt-4 space-y-3">
          {integration.prerequisites.map((prerequisite, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">{prerequisite}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        {integration.steps.map((step, index) => (
          <IntegrationStep key={index} number={index + 1} title={step.title} isImportant={step.isImportant}>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{step.description}</p>

              {step.codeSnippet && <CodeSnippet code={step.codeSnippet.code} language={step.codeSnippet.language} />}

              {step.screenshot && (
                <Screenshot src={step.screenshot.src} alt={step.screenshot.alt} caption={step.screenshot.caption} />
              )}

              {step.note && <ImportantNote>{step.note}</ImportantNote>}
            </div>
          </IntegrationStep>
        ))}
      </div>

      <div className="mt-12 rounded-lg border bg-muted/30 p-6">
        <h3 className="text-xl font-semibold tracking-tight">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your {integration.name} integration, please refer to our{" "}
          <a href="#" className="text-primary hover:underline">
            troubleshooting guide
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </IntegrationGuideLayout>
  )
}
