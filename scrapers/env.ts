// Load .env.local into process.env for Node.js scraper scripts
// (Vite normally handles this for the frontend; here we do it manually)
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export function config() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const envPath = resolve(root, '.env.local')
  if (!existsSync(envPath)) return

  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && !process.env[key]) {
      process.env[key] = val
      // Alias: Vite prefix → plain key for Anthropic SDK
      if (key === 'VITE_ANTHROPIC_API_KEY') {
        process.env['ANTHROPIC_API_KEY'] = val
      }
    }
  }
}
