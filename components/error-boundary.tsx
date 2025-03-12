"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import * as Sentry from "@sentry/nextjs"

import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorDisplayProps {
  error: Error
  reset: () => void
}

function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Log the error to the console in development
    console.error(error)

    // Log the error to our logging service
    logger.error("Client-side error", {
      error: {
        message: error.message,
        stack: error.stack,
      },
      pathname,
      searchParams: searchParams.toString(),
    })

    // Report the error to Sentry
    Sentry.captureException(error, {
      tags: {
        pathname,
        searchParams: searchParams.toString(),
      },
    })
  }, [error, pathname, searchParams])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">We apologize for the inconvenience. Please try again.</p>
      </div>
      <Button onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary fallback={({ error, resetError }) => <ErrorDisplay error={error} reset={resetError} />}>
      {children}
    </Sentry.ErrorBoundary>
  )
}

