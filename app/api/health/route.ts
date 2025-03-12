import { NextResponse } from "next/server"
import { z } from "zod"

import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

// Define a schema for response validation
const healthResponseSchema = z.object({
  status: z.enum(["ok", "degraded", "error"]),
  version: z.string(),
  timestamp: z.string(),
  uptime: z.number(),
  environment: z.string(),
})

type HealthResponse = z.infer<typeof healthResponseSchema>

export async function GET() {
  try {
    // Gather health information
    const healthInfo: HealthResponse = {
      status: "ok",
      version: env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    }

    // Validate the response
    const validatedResponse = healthResponseSchema.parse(healthInfo)

    // Log the health check (in production, you might want to limit this)
    if (env.NODE_ENV === "development") {
      logger.info("Health check performed", { data: validatedResponse })
    }

    return NextResponse.json(validatedResponse)
  } catch (error) {
    // Log the error
    logger.error("Health check failed", { error })

    // Return a proper error response
    return NextResponse.json({ status: "error", message: "Health check failed" }, { status: 500 })
  }
}

