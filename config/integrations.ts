import { Mail, Slack, FileText, Shield } from "lucide-react"

export type IntegrationStep = {
  title: string
  description: string
  isImportant?: boolean
  codeSnippet?: {
    code: string
    language?: string
  }
  screenshot?: {
    src: string
    alt: string
    caption?: string
  }
  note?: string
}

export type Integration = {
  id: string
  name: string
  description: string
  icon: string
  prerequisites: string[]
  steps: IntegrationStep[]
}

export type NotificationChannel = {
  id: string
  name: string
  description: string
  icon: any
  steps: IntegrationStep[]
}

export type DocumentSection = {
  id: string
  name: string
  description: string
  icon: any
  content: string
}

export const integrations: Integration[] = [
  {
    id: "supabase",
    name: "Supabase",
    description: "Set up webhooks to receive real-time events from your Supabase project",
    icon: "/placeholder.svg?height=64&width=64",
    prerequisites: ["A Supabase account and project", "Admin access to your Supabase project"],
    steps: [
      {
        title: "Access the Supabase Dashboard",
        description: "Log in to your Supabase account and select the project you want to integrate with.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Supabase Dashboard",
          caption: "Supabase project dashboard",
        },
      },
      {
        title: "Navigate to Database Webhooks",
        description: "In the left sidebar, click on **Database**, then select **Webhooks**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Supabase Database Webhooks",
          caption: "Navigate to Database → Webhooks in the sidebar",
        },
      },
      {
        title: "Create a New Webhook",
        description: "Click the **Create a new webhook** button.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Create new webhook",
          caption: "Create a new webhook button",
        },
      },
      {
        title: "Configure Webhook Settings",
        description:
          'Fill in the webhook configuration with the following details:\n\n1. **Name:** Give your webhook a descriptive name (e.g., "User Events")\n2. **Table:** Select the database table you want to monitor for changes\n3. **Events:** Choose which events to trigger the webhook (INSERT, UPDATE, DELETE)\n4. **URL:** Enter your webhook URL from our platform',
        isImportant: true,
        codeSnippet: {
          code: "https://your-webhook-domain.com/api/integrations/supabase",
          language: "bash",
        },
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook configuration",
          caption: "Configure your webhook settings",
        },
      },
      {
        title: "Add HTTP Headers",
        description: "Add the following HTTP headers to secure your webhook:\n\n**Authorization Header:**",
        codeSnippet: {
          code: "Authorization: Bearer YOUR_WEBHOOK_SECRET",
          language: "bash",
        },
        note: "Replace `YOUR_WEBHOOK_SECRET` with the secret token generated in our platform. This token is used to verify that the webhook request is coming from Supabase.",
      },
      {
        title: "Enable the Webhook",
        description: "Toggle the webhook to **Enabled** and click **Save**.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Enable webhook",
          caption: "Enable the webhook and save your configuration",
        },
      },
      {
        title: "Test the Integration",
        description:
          "Make a change to the selected table to trigger the webhook and verify it's working correctly.\n\nYou can check the webhook delivery status in the Supabase dashboard under the Webhooks section.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook logs",
          caption: "Webhook delivery logs in Supabase",
        },
      },
    ],
  },
  {
    id: "clerk",
    name: "Clerk",
    description: "Set up webhooks to receive authentication events from Clerk",
    icon: "/placeholder.svg?height=64&width=64",
    prerequisites: ["A Clerk account and application", "Admin access to your Clerk dashboard"],
    steps: [
      {
        title: "Access the Clerk Dashboard",
        description: "Log in to your Clerk dashboard and select the application you want to integrate with.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Clerk Dashboard",
          caption: "Clerk application dashboard",
        },
      },
      {
        title: "Navigate to Webhooks",
        description: "In the left sidebar, click on **Webhooks**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Clerk Webhooks",
          caption: "Navigate to Webhooks in the sidebar",
        },
      },
      {
        title: "Add Endpoint",
        description: "Click the **Add Endpoint** button.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Add Endpoint",
          caption: "Add a new webhook endpoint",
        },
      },
      {
        title: "Configure Webhook Settings",
        description:
          "Fill in the webhook configuration with the following details:\n\n1. **Endpoint URL:** Enter your webhook URL from our platform\n2. **Message Filtering:** Select the events you want to receive (e.g., user.created, user.updated, session.created)\n3. **Version:** Select the latest API version",
        isImportant: true,
        codeSnippet: {
          code: "https://your-webhook-domain.com/api/integrations/clerk",
          language: "bash",
        },
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook configuration",
          caption: "Configure your webhook settings",
        },
      },
      {
        title: "Set Up Signing Secret",
        description:
          "Clerk will generate a signing secret for your webhook. Copy this secret and add it to our platform.",
        isImportant: true,
        note: "The signing secret is used to verify that webhook requests are coming from Clerk. Store this secret securely and never expose it in client-side code.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Signing Secret",
          caption: "Copy the signing secret for verification",
        },
      },
      {
        title: "Test the Integration",
        description:
          "Click the **Test** button to send a test event to your webhook endpoint.\n\nYou can also trigger real events by performing actions in your Clerk application, such as creating a new user.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Test Webhook",
          caption: "Test your webhook integration",
        },
      },
    ],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Set up webhooks to receive payment and subscription events from Stripe",
    icon: "/placeholder.svg?height=64&width=64",
    prerequisites: ["A Stripe account", "Admin access to your Stripe dashboard"],
    steps: [
      {
        title: "Access the Stripe Dashboard",
        description: "Log in to your Stripe dashboard at [dashboard.stripe.com](https://dashboard.stripe.com).",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Stripe Dashboard",
          caption: "Stripe dashboard home",
        },
      },
      {
        title: "Navigate to Webhooks",
        description: "In the left sidebar, click on **Developers**, then select **Webhooks**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Stripe Webhooks",
          caption: "Navigate to Developers → Webhooks in the sidebar",
        },
      },
      {
        title: "Add Endpoint",
        description: "Click the **Add endpoint** button.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Add Endpoint",
          caption: "Add a new webhook endpoint",
        },
      },
      {
        title: "Configure Webhook Settings",
        description:
          "Fill in the webhook configuration with the following details:\n\n1. **Endpoint URL:** Enter your webhook URL from our platform\n2. **Events to send:** Select the events you want to receive. Common events include:\n   - checkout.session.completed\n   - customer.subscription.created\n   - customer.subscription.updated\n   - invoice.paid\n   - payment_intent.succeeded\n3. **Version:** Select the latest API version",
        isImportant: true,
        codeSnippet: {
          code: "https://your-webhook-domain.com/api/integrations/stripe",
          language: "bash",
        },
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook configuration",
          caption: "Configure your webhook settings",
        },
      },
      {
        title: "Get Webhook Signing Secret",
        description:
          "After creating the webhook, Stripe will generate a signing secret. Click **Reveal** to view it, then copy this secret and add it to our platform.",
        isImportant: true,
        note: "The webhook signing secret is used to verify that webhook requests are coming from Stripe. Store this secret securely and never expose it in client-side code.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Signing Secret",
          caption: "Copy the signing secret for verification",
        },
      },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    description: "Set up webhooks to receive repository events from GitHub",
    icon: "/placeholder.svg?height=64&width=64",
    prerequisites: ["A GitHub account", "Admin access to the GitHub repository or organization"],
    steps: [
      {
        title: "Access GitHub Repository Settings",
        description: "Navigate to your GitHub repository and click on **Settings**.",
        note: "You can set up webhooks at the repository level or at the organization level. This guide focuses on repository-level webhooks.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "GitHub Repository Settings",
          caption: "Access repository settings",
        },
      },
      {
        title: "Navigate to Webhooks",
        description: "In the left sidebar, click on **Webhooks**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "GitHub Webhooks",
          caption: "Navigate to Webhooks in the sidebar",
        },
      },
      {
        title: "Add Webhook",
        description: "Click the **Add webhook** button.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Add Webhook",
          caption: "Add a new webhook button",
        },
      },
      {
        title: "Configure Webhook Settings",
        description:
          "Fill in the webhook configuration with the following details:\n\n1. **Payload URL:** Enter your webhook URL from our platform\n2. **Content type:** Select `application/json`\n3. **Secret:** Create a secure secret and enter it here. You'll need to add this same secret to our platform.\n4. **SSL verification:** Keep this enabled for security\n5. **Which events would you like to trigger this webhook?** Choose from:\n   - Just the push event\n   - Send me everything\n   - Let me select individual events (recommended)",
        isImportant: true,
        codeSnippet: {
          code: "https://your-webhook-domain.com/api/integrations/github",
          language: "bash",
        },
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook configuration",
          caption: "Configure your webhook settings",
        },
      },
      {
        title: "Select Events",
        description:
          'If you selected "Let me select individual events," choose the specific events you want to receive. Common events include:\n\n- Push\n- Pull requests\n- Issues\n- Releases\n- Discussions',
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Select Events",
          caption: "Select the events to trigger your webhook",
        },
      },
    ],
  },
]

export const notificationChannels: NotificationChannel[] = [
  {
    id: "email",
    name: "Email",
    description: "Set up email notifications for your webhook events",
    icon: Mail,
    steps: [
      {
        title: "Access Notification Settings",
        description: "Navigate to your account dashboard and click on **Notification Channels**.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Notification Channels",
          caption: "Access notification channel settings",
        },
      },
      {
        title: "Add Email Channel",
        description: "Click on **Add Channel** and select **Email** from the dropdown menu.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Add Email Channel",
          caption: "Add a new email notification channel",
        },
      },
      {
        title: "Configure Email Settings",
        description:
          'Fill in the email configuration with the following details:\n\n1. **Channel Name:** Give your email channel a descriptive name (e.g., "Critical Alerts")\n2. **Recipients:** Add one or more email addresses that should receive notifications\n3. **Email Template:** Choose a template for your email notifications or use the default',
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Email Configuration",
          caption: "Configure your email notification settings",
        },
      },
      {
        title: "Set Notification Rules",
        description:
          "Define which webhook events should trigger email notifications:\n\n1. **Select Integrations:** Choose which webhook integrations should send notifications to this email channel\n2. **Event Types:** Specify which event types should trigger notifications (e.g., all events, only errors, specific event types)\n3. **Frequency:** Choose how often to receive notifications (e.g., immediately, digest, daily summary)",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Notification Rules",
          caption: "Set up notification rules for your email channel",
        },
      },
    ],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Set up Slack notifications for your webhook events",
    icon: Slack,
    steps: [
      {
        title: "Create a Slack App",
        description: "Visit the [Slack API website](https://api.slack.com/apps) and click **Create New App**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Create Slack App",
          caption: "Create a new Slack app",
        },
      },
      {
        title: "Configure App Settings",
        description:
          'Choose **From scratch** and provide the following details:\n\n1. **App Name:** Give your app a name (e.g., "Webhook Notifications")\n2. **Workspace:** Select the Slack workspace where you want to install the app',
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "App Settings",
          caption: "Configure your Slack app settings",
        },
      },
      {
        title: "Add Incoming Webhooks Feature",
        description: "In the left sidebar, click on **Incoming Webhooks** and toggle the feature to **On**.",
        isImportant: true,
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Incoming Webhooks",
          caption: "Enable incoming webhooks for your Slack app",
        },
      },
      {
        title: "Create a Webhook URL",
        description: "Scroll down and click **Add New Webhook to Workspace**.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Add Webhook",
          caption: "Add a new webhook to your workspace",
        },
      },
      {
        title: "Select a Channel",
        description: "Choose the Slack channel where you want to receive webhook notifications.",
        isImportant: true,
        note: "You can create a dedicated channel for webhook notifications to avoid cluttering existing channels.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Select Channel",
          caption: "Select a channel for your webhook notifications",
        },
      },
      {
        title: "Copy the Webhook URL",
        description:
          "After authorizing the app, you'll see a new webhook URL. Copy this URL as you'll need it in the next step.",
        screenshot: {
          src: "/placeholder.svg?height=450&width=800",
          alt: "Webhook URL",
          caption: "Copy the generated webhook URL",
        },
      },
    ],
  },
]

export const documentSections: DocumentSection[] = [
  {
    id: "overview",
    name: "Overview",
    description: "Learn about our webhook infrastructure platform",
    icon: FileText,
    content: `
# Webhook Infrastructure Platform

Our webhook infrastructure platform provides a seamless way to integrate third-party services with your application. Webhooks allow you to receive real-time notifications when events occur in external systems, enabling you to build responsive and event-driven applications.

## Key Features

- **Unified Integration**: Connect with multiple platforms through a single, consistent interface
- **Reliable Delivery**: Guaranteed webhook delivery with automatic retries and failure handling
- **Secure Communication**: End-to-end encryption and signature verification for all webhook traffic
- **Comprehensive Monitoring**: Real-time monitoring and logging of all webhook events
- **Flexible Notification Channels**: Route webhook events to email, Slack, or your custom endpoints

## How It Works

1. **Connect**: Set up integrations with third-party platforms using our step-by-step guides
2. **Configure**: Specify which events you want to receive and how they should be processed
3. **Receive**: Get real-time notifications when events occur in connected platforms
4. **Act**: Trigger automated workflows or update your application based on webhook events

## Getting Started

To get started with our webhook infrastructure platform, select an integration from the sidebar and follow the step-by-step guide to set it up. If you need help, our support team is available to assist you.
    `,
  },
  {
    id: "security",
    name: "Security",
    description: "Learn about our security practices and recommendations",
    icon: Shield,
    content: `
# Security Best Practices

Securing your webhook infrastructure is critical to protect your data and ensure the integrity of your systems. This guide outlines our security practices and provides recommendations for securing your webhook integrations.

## Webhook Verification

All webhooks should be verified to ensure they come from the expected source. Each platform provides a unique method for verification:

### Signature Verification

Most platforms include a signature in the webhook request headers. This signature is generated using a secret key and the request payload. To verify the webhook:

1. Extract the signature from the request headers
2. Generate a signature using your secret key and the request payload
3. Compare the two signatures to ensure they match

\`\`\`javascript
// Example signature verification
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}
\`\`\`

### IP Allowlisting

Some platforms send webhooks from specific IP addresses. You can enhance security by only accepting webhook requests from these IP addresses.

## Secure Storage of Secrets

Webhook secrets should be stored securely:

1. **Never hardcode secrets** in your application code
2. Use environment variables or a secure secret management service
3. Rotate secrets periodically to limit the impact of potential leaks

## HTTPS Encryption

Always use HTTPS for webhook endpoints to ensure that webhook data is encrypted in transit.

## Rate Limiting

Implement rate limiting on your webhook endpoints to protect against denial-of-service attacks.

## Logging and Monitoring

Maintain comprehensive logs of webhook requests and set up monitoring to detect unusual patterns that might indicate a security issue.

## Regular Security Reviews

Periodically review your webhook integrations and security practices to ensure they remain effective and up-to-date.
    `,
  },
]
