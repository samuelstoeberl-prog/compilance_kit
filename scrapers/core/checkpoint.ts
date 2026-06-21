// Checkpoint system: saves crawl progress to disk so a crash can be resumed

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export interface CheckpointData {
  runId: string
  startedAt: string
  visitedUrls: string[]
  pendingQueue: Array<{ url: string; depth: number; domain: string }>
  results: unknown[]
}

const CHECKPOINT_DIR = resolve(process.cwd(), '.scraper-checkpoints')

function ensureDir() {
  if (!existsSync(CHECKPOINT_DIR)) mkdirSync(CHECKPOINT_DIR, { recursive: true })
}

export function saveCheckpoint(runId: string, data: CheckpointData): void {
  ensureDir()
  const path = resolve(CHECKPOINT_DIR, `${runId}.json`)
  writeFileSync(path, JSON.stringify(data, null, 2))
}

export function loadCheckpoint(runId: string): CheckpointData | null {
  const path = resolve(CHECKPOINT_DIR, `${runId}.json`)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf-8'))
}

export function clearCheckpoint(runId: string): void {
  const path = resolve(CHECKPOINT_DIR, `${runId}.json`)
  if (existsSync(path)) {
    const { unlinkSync } = require('fs')
    unlinkSync(path)
  }
}

export function generateRunId(prefix: string): string {
  return `${prefix}-${new Date().toISOString().slice(0, 10)}-${Date.now()}`
}
