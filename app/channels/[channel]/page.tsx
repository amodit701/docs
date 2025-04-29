import { notFound } from "next/navigation"
import { Check } from "lucide-react"

import { notificationChannels } from "@/config/integrations"
import { CodeSnippet } from "@/components/integration-guide/code-snippet"
import { ImportantNote } from "@/components/integration-guide/important-note"
import { IntegrationStep } from "@/components/integration-guide/integration-step"
import { IntegrationGuideLayout } from "@/components/integration-guide/layout"
import { Screenshot } from "@/components/integration-guide/screenshot"

interface ChannelPageProps {
  params: {
    channel: string
  }
}

export function generateStaticParams() {
  return notificationChannels.map((channel) => ({
    channel: channel.id,
  }))
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const channel = notificationChannels.find((c) => c.id === params.channel)

  if (!channel) {
    notFound()
  }

  const Icon = channel.icon

  return (
    <IntegrationGuideLayout>
      <div className="mb-10 flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-heading">{channel.name}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{channel.description}</p>
        </div>
      </div>

      <div className="mb-10 rounded-lg border bg-muted/30 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span className="text-muted-foreground">An active account on our platform</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span className="text-muted-foreground">At least one webhook integration set up</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        {channel.steps.map((step, index) => (
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
          If you encounter any issues setting up your {channel.name} notifications, please refer to our{" "}
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
