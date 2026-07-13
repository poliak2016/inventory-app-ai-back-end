import cors from "cors"
import { env } from "./env.js"

const primaryOrigin = env.CLIENT_URL || "http://localhost:5173"
const vercelPreviewPattern = /^https:\/\/inventory-app-ai-front[a-z0-9-]*-poliak2016s-projects\.vercel\.app$/

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowed = !origin || origin === primaryOrigin || vercelPreviewPattern.test(origin)
    callback(null, allowed)
  },
  credentials: true
})