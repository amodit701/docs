"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Check, Copy, Github, Mail, Search, Slack, Webhook } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample platforms and notification channels from config
const platforms = [
  { id: "supabase", name: "Supabase", icon: "/placeholder.svg?height=40&width=40" },
  { id: "clerk", name: "Clerk", icon: "/placeholder.svg?height=40&width=40" },
  { id: "stripe", name: "Stripe", icon: "/placeholder.svg?height=40&width=40" },
  { id: "github", name: "GitHub", icon: "/placeholder.svg?height=40&width=40" },
]

const notificationChannels = [
  { id: "email", name: "Email", icon: <Mail className="h-5 w-5" /> },
  { id: "slack", name: "Slack", icon: <Slack className="h-5 w-5" /> },
]

export default function IntegrationGuide() {
  const [activeSection, setActiveSection] = useState("supabase")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredChannels = notificationChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <Webhook className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Integration Guide</h1>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[250px_1fr]">
        <aside className="border-r bg-muted/40">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search integrations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-9rem)]">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Platforms</h2>
              <div className="space-y-1">
                {filteredPlatforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={activeSection === platform.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(platform.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={platform.icon || "/placeholder.svg"}
                        alt={platform.name}
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      {platform.name}
                    </div>
                  </Button>
                ))}
              </div>
              <Separator className="my-4" />
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Notification Channels</h2>
              <div className="space-y-1">
                {filteredChannels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant={activeSection === channel.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(channel.id)}
                  >
                    <div className="flex items-center gap-3">
                      {channel.icon}
                      {channel.name}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="container max-w-4xl py-6">
              {activeSection === "supabase" && <SupabaseGuide />}
              {activeSection === "clerk" && <ClerkGuide />}
              {activeSection === "stripe" && <StripeGuide />}
              {activeSection === "github" && <GitHubGuide />}
              {activeSection === "email" && <EmailGuide />}
              {activeSection === "slack" && <SlackGuide />}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}

function IntegrationStep({ number, title, children, isImportant = false }) {
  return (
    <div className={cn("mb-8 rounded-lg border p-6", isImportant && "border-primary/50 bg-primary/5")}>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
            isImportant ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {number}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}

function CodeSnippet({ code, language = "bash" }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-md bg-muted">
      <div className="absolute right-2 top-2">
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
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ImportantNote({ children }) {
  return (
    <div className="my-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
      <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  )
}

function ScreenshotImage({ src, alt, caption }) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg border">
        <Image src={src || "/placeholder.svg"} alt={alt} width={800} height={450} className="w-full object-cover" />
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

function SupabaseGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/placeholder.svg?height=64&width=64"
          alt="Supabase logo"
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supabase Integration</h1>
          <p className="text-muted-foreground">
            Set up webhooks to receive real-time events from your Supabase project
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>A Supabase account and project</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Admin access to your Supabase project</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Access the Supabase Dashboard">
        <p className="mb-2">Log in to your Supabase account and select the project you want to integrate with.</p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Supabase Dashboard"
          caption="Supabase project dashboard"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Navigate to Database Webhooks" isImportant={true}>
        <p className="mb-2">
          In the left sidebar, click on <strong>Database</strong>, then select <strong>Webhooks</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Supabase Database Webhooks"
          caption="Navigate to Database → Webhooks in the sidebar"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Create a New Webhook">
        <p className="mb-2">
          Click the <strong>Create a new webhook</strong> button.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Create new webhook"
          caption="Create a new webhook button"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Configure Webhook Settings" isImportant={true}>
        <p className="mb-4">Fill in the webhook configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Name:</strong> Give your webhook a descriptive name (e.g., "User Events")
          </li>
          <li>
            <strong>Table:</strong> Select the database table you want to monitor for changes
          </li>
          <li>
            <strong>Events:</strong> Choose which events to trigger the webhook (INSERT, UPDATE, DELETE)
          </li>
          <li>
            <strong>URL:</strong> Enter your webhook URL from our platform
            <CodeSnippet code="https://your-webhook-domain.com/api/integrations/supabase" />
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook configuration"
          caption="Configure your webhook settings"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Add HTTP Headers">
        <p className="mb-2">Add the following HTTP headers to secure your webhook:</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Authorization Header:</p>
            <CodeSnippet code="Authorization: Bearer YOUR_WEBHOOK_SECRET" />
          </div>
          <div>
            <p className="font-medium">Content-Type Header:</p>
            <CodeSnippet code="Content-Type: application/json" />
          </div>
        </div>
        <ImportantNote>
          Replace <code>YOUR_WEBHOOK_SECRET</code> with the secret token generated in our platform. This token is used
          to verify that the webhook request is coming from Supabase.
        </ImportantNote>
      </IntegrationStep>

      <IntegrationStep number={6} title="Enable the Webhook">
        <p className="mb-2">
          Toggle the webhook to <strong>Enabled</strong> and click <strong>Save</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Enable webhook"
          caption="Enable the webhook and save your configuration"
        />
      </IntegrationStep>

      <IntegrationStep number={7} title="Test the Integration">
        <p className="mb-2">
          Make a change to the selected table to trigger the webhook and verify it's working correctly.
        </p>
        <p className="mb-2">
          You can check the webhook delivery status in the Supabase dashboard under the Webhooks section.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook logs"
          caption="Webhook delivery logs in Supabase"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your Supabase integration, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function ClerkGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/placeholder.svg?height=64&width=64"
          alt="Clerk logo"
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clerk Integration</h1>
          <p className="text-muted-foreground">Set up webhooks to receive authentication events from Clerk</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>A Clerk account and application</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Admin access to your Clerk dashboard</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Access the Clerk Dashboard">
        <p className="mb-2">Log in to your Clerk dashboard and select the application you want to integrate with.</p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Clerk Dashboard"
          caption="Clerk application dashboard"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Navigate to Webhooks" isImportant={true}>
        <p className="mb-2">
          In the left sidebar, click on <strong>Webhooks</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Clerk Webhooks"
          caption="Navigate to Webhooks in the sidebar"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Add Endpoint">
        <p className="mb-2">
          Click the <strong>Add Endpoint</strong> button.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Endpoint"
          caption="Add a new webhook endpoint"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Configure Webhook Settings" isImportant={true}>
        <p className="mb-4">Fill in the webhook configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Endpoint URL:</strong> Enter your webhook URL from our platform
            <CodeSnippet code="https://your-webhook-domain.com/api/integrations/clerk" />
          </li>
          <li>
            <strong>Message Filtering:</strong> Select the events you want to receive (e.g., user.created, user.updated,
            session.created)
          </li>
          <li>
            <strong>Version:</strong> Select the latest API version
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook configuration"
          caption="Configure your webhook settings"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Set Up Signing Secret" isImportant={true}>
        <p className="mb-2">
          Clerk will generate a signing secret for your webhook. Copy this secret and add it to our platform.
        </p>
        <ImportantNote>
          The signing secret is used to verify that webhook requests are coming from Clerk. Store this secret securely
          and never expose it in client-side code.
        </ImportantNote>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Signing Secret"
          caption="Copy the signing secret for verification"
        />
      </IntegrationStep>

      <IntegrationStep number={6} title="Test the Integration">
        <p className="mb-2">
          Click the <strong>Test</strong> button to send a test event to your webhook endpoint.
        </p>
        <p className="mb-2">
          You can also trigger real events by performing actions in your Clerk application, such as creating a new user.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Test Webhook"
          caption="Test your webhook integration"
        />
      </IntegrationStep>

      <IntegrationStep number={7} title="Monitor Webhook Deliveries">
        <p className="mb-2">
          Clerk provides a delivery history for your webhooks. You can use this to monitor successful deliveries and
          troubleshoot any failures.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook Deliveries"
          caption="Monitor webhook delivery history"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your Clerk integration, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function StripeGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/placeholder.svg?height=64&width=64"
          alt="Stripe logo"
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stripe Integration</h1>
          <p className="text-muted-foreground">
            Set up webhooks to receive payment and subscription events from Stripe
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>A Stripe account</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Admin access to your Stripe dashboard</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Access the Stripe Dashboard">
        <p className="mb-2">
          Log in to your Stripe dashboard at{" "}
          <Link
            href="https://dashboard.stripe.com"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            dashboard.stripe.com
          </Link>
          .
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Stripe Dashboard"
          caption="Stripe dashboard home"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Navigate to Webhooks" isImportant={true}>
        <p className="mb-2">
          In the left sidebar, click on <strong>Developers</strong>, then select <strong>Webhooks</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Stripe Webhooks"
          caption="Navigate to Developers → Webhooks in the sidebar"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Add Endpoint">
        <p className="mb-2">
          Click the <strong>Add endpoint</strong> button.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Endpoint"
          caption="Add a new webhook endpoint"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Configure Webhook Settings" isImportant={true}>
        <p className="mb-4">Fill in the webhook configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Endpoint URL:</strong> Enter your webhook URL from our platform
            <CodeSnippet code="https://your-webhook-domain.com/api/integrations/stripe" />
          </li>
          <li>
            <strong>Events to send:</strong> Select the events you want to receive. Common events include:
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>checkout.session.completed</li>
              <li>customer.subscription.created</li>
              <li>customer.subscription.updated</li>
              <li>invoice.paid</li>
              <li>payment_intent.succeeded</li>
            </ul>
          </li>
          <li>
            <strong>Version:</strong> Select the latest API version
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook configuration"
          caption="Configure your webhook settings"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Get Webhook Signing Secret" isImportant={true}>
        <p className="mb-2">
          After creating the webhook, Stripe will generate a signing secret. Click <strong>Reveal</strong> to view it,
          then copy this secret and add it to our platform.
        </p>
        <ImportantNote>
          The webhook signing secret is used to verify that webhook requests are coming from Stripe. Store this secret
          securely and never expose it in client-side code.
        </ImportantNote>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Signing Secret"
          caption="Copy the signing secret for verification"
        />
      </IntegrationStep>

      <IntegrationStep number={6} title="Test the Integration">
        <p className="mb-2">
          Stripe provides a way to test your webhook by sending test events. Click <strong>Send test webhook</strong>{" "}
          and select an event type to test.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Test Webhook"
          caption="Send a test webhook event"
        />
      </IntegrationStep>

      <IntegrationStep number={7} title="Monitor Webhook Deliveries">
        <p className="mb-2">
          Stripe provides a detailed log of webhook attempts. You can use this to monitor successful deliveries and
          troubleshoot any failures.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook Logs"
          caption="Monitor webhook delivery logs"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your Stripe integration, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function GitHubGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Github className="h-16 w-16 text-black dark:text-white" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GitHub Integration</h1>
          <p className="text-muted-foreground">Set up webhooks to receive repository events from GitHub</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>A GitHub account</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Admin access to the GitHub repository or organization</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Access GitHub Repository Settings">
        <p className="mb-2">
          Navigate to your GitHub repository and click on <strong>Settings</strong>.
        </p>
        <ImportantNote>
          You can set up webhooks at the repository level or at the organization level. This guide focuses on
          repository-level webhooks.
        </ImportantNote>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="GitHub Repository Settings"
          caption="Access repository settings"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Navigate to Webhooks" isImportant={true}>
        <p className="mb-2">
          In the left sidebar, click on <strong>Webhooks</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="GitHub Webhooks"
          caption="Navigate to Webhooks in the sidebar"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Add Webhook">
        <p className="mb-2">
          Click the <strong>Add webhook</strong> button.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Webhook"
          caption="Add a new webhook button"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Configure Webhook Settings" isImportant={true}>
        <p className="mb-4">Fill in the webhook configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Payload URL:</strong> Enter your webhook URL from our platform
            <CodeSnippet code="https://your-webhook-domain.com/api/integrations/github" />
          </li>
          <li>
            <strong>Content type:</strong> Select <code>application/json</code>
          </li>
          <li>
            <strong>Secret:</strong> Create a secure secret and enter it here. You'll need to add this same secret to
            our platform.
          </li>
          <li>
            <strong>SSL verification:</strong> Keep this enabled for security
          </li>
          <li>
            <strong>Which events would you like to trigger this webhook?</strong> Choose from:
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Just the push event</li>
              <li>Send me everything</li>
              <li>Let me select individual events (recommended)</li>
            </ul>
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook configuration"
          caption="Configure your webhook settings"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Select Events" isImportant={true}>
        <p className="mb-2">
          If you selected "Let me select individual events," choose the specific events you want to receive. Common
          events include:
        </p>
        <ul className="ml-6 mt-2 list-disc space-y-1">
          <li>Push</li>
          <li>Pull requests</li>
          <li>Issues</li>
          <li>Releases</li>
          <li>Discussions</li>
        </ul>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Select Events"
          caption="Select the events to trigger your webhook"
        />
      </IntegrationStep>

      <IntegrationStep number={6} title="Add the Webhook">
        <p className="mb-2">
          Click the <strong>Add webhook</strong> button to create your webhook.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Webhook Button"
          caption="Add the webhook to complete setup"
        />
      </IntegrationStep>

      <IntegrationStep number={7} title="Test and Monitor the Webhook">
        <p className="mb-2">
          GitHub provides a way to view recent deliveries and redeliver webhooks for testing. You can also see the
          response status and details for each delivery.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook Deliveries"
          caption="Monitor webhook delivery history"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your GitHub integration, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function EmailGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Mail className="h-16 w-16 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Notification Channel</h1>
          <p className="text-muted-foreground">Set up email notifications for your webhook events</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>An active account on our platform</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>At least one webhook integration set up</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Access Notification Settings">
        <p className="mb-2">
          Navigate to your account dashboard and click on <strong>Notification Channels</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Notification Channels"
          caption="Access notification channel settings"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Add Email Channel" isImportant={true}>
        <p className="mb-2">
          Click on <strong>Add Channel</strong> and select <strong>Email</strong> from the dropdown menu.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Email Channel"
          caption="Add a new email notification channel"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Configure Email Settings">
        <p className="mb-4">Fill in the email configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Channel Name:</strong> Give your email channel a descriptive name (e.g., "Critical Alerts")
          </li>
          <li>
            <strong>Recipients:</strong> Add one or more email addresses that should receive notifications
          </li>
          <li>
            <strong>Email Template:</strong> Choose a template for your email notifications or use the default
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Email Configuration"
          caption="Configure your email notification settings"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Set Notification Rules" isImportant={true}>
        <p className="mb-2">Define which webhook events should trigger email notifications:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Select Integrations:</strong> Choose which webhook integrations should send notifications to this
            email channel
          </li>
          <li>
            <strong>Event Types:</strong> Specify which event types should trigger notifications (e.g., all events, only
            errors, specific event types)
          </li>
          <li>
            <strong>Frequency:</strong> Choose how often to receive notifications (e.g., immediately, digest, daily
            summary)
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Notification Rules"
          caption="Set up notification rules for your email channel"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Customize Email Content">
        <p className="mb-2">Customize the content of your email notifications:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Subject Line:</strong> Define a custom subject line format
          </li>
          <li>
            <strong>Email Body:</strong> Customize the email body template
          </li>
          <li>
            <strong>Include Data:</strong> Choose which webhook data to include in the email
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Email Customization"
          caption="Customize your email notification content"
        />
      </IntegrationStep>

      <IntegrationStep number={6} title="Save and Test">
        <p className="mb-2">
          Save your email channel configuration and send a test notification to verify it's working correctly.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Test Email"
          caption="Send a test email notification"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your email notifications, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function SlackGuide() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Slack className="h-16 w-16 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Slack Notification Channel</h1>
          <p className="text-muted-foreground">Set up Slack notifications for your webhook events</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>A Slack workspace with admin privileges</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 text-green-500" />
            <span>At least one webhook integration set up on our platform</span>
          </li>
        </ul>
      </div>

      <IntegrationStep number={1} title="Create a Slack App" isImportant={true}>
        <p className="mb-2">
          Visit the{" "}
          <Link
            href="https://api.slack.com/apps"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slack API website
          </Link>{" "}
          and click <strong>Create New App</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Create Slack App"
          caption="Create a new Slack app"
        />
      </IntegrationStep>

      <IntegrationStep number={2} title="Configure App Settings">
        <p className="mb-2">
          Choose <strong>From scratch</strong> and provide the following details:
        </p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>App Name:</strong> Give your app a name (e.g., "Webhook Notifications")
          </li>
          <li>
            <strong>Workspace:</strong> Select the Slack workspace where you want to install the app
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="App Settings"
          caption="Configure your Slack app settings"
        />
      </IntegrationStep>

      <IntegrationStep number={3} title="Add Incoming Webhooks Feature" isImportant={true}>
        <p className="mb-2">
          In the left sidebar, click on <strong>Incoming Webhooks</strong> and toggle the feature to <strong>On</strong>
          .
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Incoming Webhooks"
          caption="Enable incoming webhooks for your Slack app"
        />
      </IntegrationStep>

      <IntegrationStep number={4} title="Create a Webhook URL">
        <p className="mb-2">
          Scroll down and click <strong>Add New Webhook to Workspace</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Webhook"
          caption="Add a new webhook to your workspace"
        />
      </IntegrationStep>

      <IntegrationStep number={5} title="Select a Channel" isImportant={true}>
        <p className="mb-2">Choose the Slack channel where you want to receive webhook notifications.</p>
        <ImportantNote>
          You can create a dedicated channel for webhook notifications to avoid cluttering existing channels.
        </ImportantNote>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Select Channel"
          caption="Select a channel for your webhook notifications"
        />
      </IntegrationStep>

      <IntegrationStep number={6} title="Copy the Webhook URL">
        <p className="mb-2">
          After authorizing the app, you'll see a new webhook URL. Copy this URL as you'll need it in the next step.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Webhook URL"
          caption="Copy the generated webhook URL"
        />
      </IntegrationStep>

      <IntegrationStep number={7} title="Add Slack Channel in Our Platform" isImportant={true}>
        <p className="mb-2">
          Return to our platform and navigate to <strong>Notification Channels</strong>. Click{" "}
          <strong>Add Channel</strong> and select <strong>Slack</strong>.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Add Slack Channel"
          caption="Add a new Slack notification channel"
        />
      </IntegrationStep>

      <IntegrationStep number={8} title="Configure Slack Notification Settings">
        <p className="mb-4">Fill in the Slack configuration with the following details:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Channel Name:</strong> Give your Slack channel a descriptive name (e.g., "Production Alerts")
          </li>
          <li>
            <strong>Webhook URL:</strong> Paste the Slack webhook URL you copied earlier
            <CodeSnippet code="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX" />
          </li>
          <li>
            <strong>Notification Format:</strong> Choose how you want your notifications to appear in Slack
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Slack Configuration"
          caption="Configure your Slack notification settings"
        />
      </IntegrationStep>

      <IntegrationStep number={9} title="Set Notification Rules">
        <p className="mb-2">Define which webhook events should trigger Slack notifications:</p>
        <ol className="ml-6 list-decimal space-y-4">
          <li>
            <strong>Select Integrations:</strong> Choose which webhook integrations should send notifications to this
            Slack channel
          </li>
          <li>
            <strong>Event Types:</strong> Specify which event types should trigger notifications
          </li>
          <li>
            <strong>Frequency:</strong> Choose how often to receive notifications
          </li>
        </ol>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Notification Rules"
          caption="Set up notification rules for your Slack channel"
        />
      </IntegrationStep>

      <IntegrationStep number={10} title="Save and Test">
        <p className="mb-2">
          Save your Slack channel configuration and send a test notification to verify it's working correctly.
        </p>
        <ScreenshotImage
          src="/placeholder.svg?height=450&width=800"
          alt="Test Slack"
          caption="Send a test Slack notification"
        />
      </IntegrationStep>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-lg font-medium">Need Help?</h3>
        <p className="mt-2 text-muted-foreground">
          If you encounter any issues setting up your Slack notifications, please refer to our
          <Link href="#" className="mx-1 text-primary hover:underline">
            troubleshooting guide
          </Link>
          or
          <Link href="#" className="ml-1 text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
