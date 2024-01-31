'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('hpp route accept querystring name', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/hpp?name=foo',
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { name: 'foo' })
})

test('hpp route not accept when querystring is not defined', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/hpp',
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "querystring must have required property 'name'",
    statusCode: 400
  })
})

test('hpp route not accept when querystring is empty', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/hpp?name=',
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "querystring/name must NOT have fewer than 1 characters",
    statusCode: 400
  })
})

test('hpp route not accept querystring name pollution', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/hpp?name=foo&name=bar',
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'querystring/name must be string',
    statusCode: 400
  })
})
