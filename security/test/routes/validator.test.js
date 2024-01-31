'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('validator route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
    payload: { name: 'foo' }
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { name: 'foo' })
})

test('validator route not accept when body is not defined', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body must be object',
    statusCode: 400
  })
})

test('validator route not accept when body is null', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
    payload: null
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body must be object',
    statusCode: 400
  })
})

test('validator route not accept when body is empty', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
    payload: {}
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: `body must have required property 'name'`,
    statusCode: 400
  })
})

test('validator route not accept when body has name null', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
    payload: {
      name: null
    }
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: `body/name must be string`,
    statusCode: 400
  })
})


test('validator route not accept when body has name empty', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/validator',
    payload: {
      name: ''
    }
  })
  assert.deepStrictEqual(res.statusCode, 400)
  assert.deepStrictEqual(JSON.parse(res.payload), {
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: `body/name must NOT have fewer than 1 characters`,
    statusCode: 400
  })
})