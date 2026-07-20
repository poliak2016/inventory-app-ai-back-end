import cors from "cors"
import { env } from "./env.js"

const primaryOrigin = env.CLIENT_URL || "http://localhost:5173"
const allowedOrigins = new Set([primaryOrigin, "https://getkitchenos.app", "https://www.getkitchenos.app"])
const vercelPreviewPattern = /^https:\/\/inventory-app-ai-front[a-z0-9-]*-poliak2016s-projects\.vercel\.app$/

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowed = !origin || allowedOrigins.has(origin) || vercelPreviewPattern.test(origin)
    callback(null, allowed)
  },
  credentials: true
})