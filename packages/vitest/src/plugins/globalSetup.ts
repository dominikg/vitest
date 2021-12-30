import type { Plugin } from 'vite'

export const GlobalSetupPlugin = (): Plugin => {
  let setup: (() => (Promise<Function | void> | void)) | undefined
  let teardown: Function | void
  return {
    name: 'vitest:global-setup-plugin',
    enforce: 'post',
    async configResolved(config) {
      setup = config.test?.globalSetup
    },
    async buildStart() {
      if (setup)
        teardown = await setup()
    },
    async buildEnd() {
      try {
        await teardown?.()
      }
      catch (e) {
        console.error('error during global teardown', e)
      }
    },
  }
}
