require("dotenv").config({ path: ".env.local" })

// Register ts-node with a dedicated tsconfig for seeding
require("ts-node").register({
  project: "./tsconfig.seed.json",
  transpileOnly: true,
})

// Run the actual seed script
require("./scripts/seed-db.ts")

console.log("Seed script wrapper executed. Check logs for details.")

