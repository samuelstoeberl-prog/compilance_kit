import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export function loadEnv() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  for (const file of ['.env.local', '.env']) {
    const p = resolve(root, file)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf-8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const key = t.slice(0, eq).trim()
      const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (key && !process.env[key]) {
        process.env[key] = val
        if (key === 'VITE_ANTHROPIC_API_KEY') process.env['ANTHROPIC_API_KEY'] = val
      }
    }
    break
  }
}
