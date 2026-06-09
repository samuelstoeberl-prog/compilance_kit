import { createClerkClient } from '@clerk/backend'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

export async function getUserId(authHeader: string | undefined): Promise<string | null> {
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return null
  try {
    const payload = await clerk.verifyToken(token)
    return payload.sub
  } catch {
    return null
  }
}
