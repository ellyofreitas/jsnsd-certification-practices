'use strict'

const blacklist = ['192.168.0.2']

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/ip',
    onRequest: function (request, reply, done) {
      const clientIP = request.ip;
      if (blacklist.includes(request.ip)) {
        reply.code(401)
        return reply.code(403).send('');
      }
      return done()
    },
    handler(request, reply) {
      return { ip: request.ip }
    }
  })
}
