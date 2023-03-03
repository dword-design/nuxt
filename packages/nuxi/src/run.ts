import mri from 'mri'
import type { Command, NuxtCommand } from './commands'
import { commands } from './commands'

export async function runCommand (command: string, argv = process.argv.slice(2), options: any): Promise<any> {
  const args = mri(argv)
  args.clear = false // used by dev
  args.config = options.config
  const cmd = await commands[command as Command]() as NuxtCommand
  if (!cmd) {
    throw new Error(`Invalid command ${command}`)
  }
  return cmd.invoke(args)
}
