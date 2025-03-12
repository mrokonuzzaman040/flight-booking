type LogLevel = "debug" | "info" | "warn" | "error"

interface LogPayload {
  message: string
  [key: string]: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  debug(message: string, meta: Record<string, any> = {}) {
    this.log("debug", { message, ...meta })
  }

  info(message: string, meta: Record<string, any> = {}) {
    this.log("info", { message, ...meta })
  }

  warn(message: string, meta: Record<string, any> = {}) {
    this.log("warn", { message, ...meta })
  }

  error(message: string, meta: Record<string, any> = {}) {
    this.log("error", { message, ...meta })
  }

  private log(level: LogLevel, payload: LogPayload) {
    // In development, log to console with colors
    if (this.isDevelopment) {
      const colors = {
        debug: "\x1b[34m", // Blue
        info: "\x1b[32m", // Green
        warn: "\x1b[33m", // Yellow
        error: "\x1b[31m", // Red
      }

      const timestamp = new Date().toISOString()
      const reset = "\x1b[0m"
      const color = colors[level]

      console[level === "debug" ? "log" : level](
        `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${payload.message}`,
        payload.error || payload.data || "",
      )
      return
    }

    // In production, we would send logs to a service like Datadog, Sentry, etc.
    // This is a simplified example
    try {
      const logEntry = {
        level,
        timestamp: new Date().toISOString(),
        ...payload,
      }

      // For production, you would use a proper logging service
      // Example: await fetch('https://logging-service.com/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry),
      // })

      // For critical errors in production, you might want to notify in real-time
      if (level === "error" && process.env.NODE_ENV === "production") {
        // Send to error monitoring service
        // Example: Sentry.captureException(payload.error)
      }
    } catch (err) {
      // Fallback to console in case the logging service fails
      console.error("Failed to log to service:", err)
      console[level === "debug" ? "log" : level](payload)
    }
  }
}

export const logger = new Logger()

