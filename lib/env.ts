import { z } from "zod"

// Define schema for environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Application
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_VERSION: z.string().optional().default("0.1.0"),

  // Database (example)
  DATABASE_URL: z.string().optional(),

  // Authentication (example)
  AUTH_SECRET: z.string().optional(),

  // API keys (example)
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Analytics (example)
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
})

// Parse and validate environment variables
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.flatten().fieldErrors)

  throw new Error("Invalid environment variables")
}

// Export validated environment variables
export const env = _env.data

