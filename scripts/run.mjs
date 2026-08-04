import { spawn } from 'node:child_process'

const [mode, entry] = process.argv.slice(2)

if (!entry) {
  console.error('Usage: node scripts/run.mjs <dev|build|export> <presentation-dir>')
  process.exit(1)
}

const target = entry.endsWith('.md') ? entry : `${entry}/slides.md`

const args = []
if (mode === 'dev') args.push('--open')
else args.push(mode)

args.push(target)

if (mode === 'export') args.push('--with-clicks')

spawn('npx', ['slidev', ...args], { stdio: 'inherit' })
