import { spawn } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const dirs = readdirSync('.').filter((d) => d.startsWith('preza-') && !d.startsWith('.'))

for (const dir of dirs) {
  const entry = join(dir, 'slides.md')
  console.log(`Building ${dir}...`)
  await run('npx', ['slidev', 'build', entry])
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`))
    })
    child.on('error', reject)
  })
}
