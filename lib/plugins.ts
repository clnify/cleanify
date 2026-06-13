import fs from 'fs'
import path from 'path'
import { PluginManifest } from '@/types'

const PLUGINS_DIR = path.join(process.cwd(), 'plugins')
const CONFIG_PATH = path.join(process.cwd(), 'config/plugins.json')

export function getEnabledPlugins(): string[] {
  if (!fs.existsSync(CONFIG_PATH)) return []
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
    return config.enabled || []
  } catch {
    return []
  }
}

export function getPluginManifest(pluginId: string): PluginManifest | null {
  const manifestPath = path.join(PLUGINS_DIR, pluginId, 'manifest.json')
  if (!fs.existsSync(manifestPath)) return null
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  } catch {
    return null
  }
}

export function getAllPlugins(): PluginManifest[] {
  if (!fs.existsSync(PLUGINS_DIR)) return []
  const enabled = getEnabledPlugins()
  const dirs = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  return dirs
    .filter(d => enabled.includes(d))
    .map(d => getPluginManifest(d))
    .filter(Boolean) as PluginManifest[]
}
