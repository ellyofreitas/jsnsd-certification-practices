'use strict'

const { build: buildApplication } = require('fastify-cli/helper')
const path = require('node:path')
const AppPath = path.join(__dirname, '..', 'app.js')

function config() {
  return {
    ajv: {
      customOptions: {
        useDefaults: false,
        coerceTypes: false,
      },
    }
  }
}

async function build(t) {
  const argv = [AppPath]

  const app = await buildApplication(argv, {}, config())

  t.after(() => app.close())

  return app
}

module.exports = {
  config,
  build
}
