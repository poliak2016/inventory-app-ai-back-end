import cors from "cors"
import { env } from "./env.js"

export const corsMiddleware = cors({
  origin: env.CLIENT_URL || "http://localhost:5173",
  credentials: true
})