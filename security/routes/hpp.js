'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/hpp', {
    schema: {
      querystring: {
        type: 'object',
        nullable: false,
        required: ['name'],
        properties: {
          name: { type: 'string', nullable: false, minLength: 1 },
        }
      }
    }
  },
    async function (request, reply) {
      return { name: request.query.name }
    })
}
