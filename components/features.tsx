import { Zap, Shield, BarChart, RefreshCw, AlertCircle, LineChart, Globe, Database, Lock } from "lucide-react"

export function Features() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 py-8">
        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Performance Optimized</h3>
          <p className="text-sm text-muted-foreground">
            Leverages React Server Components, streaming, and partial rendering for optimal performance.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Security First</h3>
          <p className="text-sm text-muted-foreground">
            Implements security headers, input validation, and protection against common vulnerabilities.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <BarChart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Built-in Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Integrated with Vercel Analytics and Speed Insights for performance monitoring.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Incremental Static Regeneration</h3>
          <p className="text-sm text-muted-foreground">
            Combines the benefits of static generation with the ability to update content.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Error Handling & Logging</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive error boundaries and structured logging for debugging.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <LineChart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Ready for integration with monitoring services for real-time alerts.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Edge-Ready</h3>
          <p className="text-sm text-muted-foreground">Optimized for Vercel's Edge Network with middleware support.</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Efficient Data Fetching</h3>
          <p className="text-sm text-muted-foreground">
            Implements React Query and SWR for optimized data fetching and caching.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Environment Management</h3>
          <p className="text-sm text-muted-foreground">Secure environment variable handling with runtime validation.</p>
        </div>
      </div>
    </div>
  )
}

