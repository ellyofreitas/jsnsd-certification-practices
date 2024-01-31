'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('ip route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/ip',
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { ip: '127.0.0.1' })
})

test('ip route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/ip',
    remoteAddress: '192.168.0.1'
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { ip: '192.168.0.1' })
})


test('ip route reject when ip is in blacklist', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/ip',
    remoteAddress: '192.168.0.2'
  })
  assert.deepStrictEqual(res.statusCode, 403)
  assert.deepStrictEqual(res.payload, '')
})