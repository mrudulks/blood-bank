// ESM
// import Fastify from 'fastify'
// const fastify = Fastify({
//   logger: true
// })
// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./routes/items'))

const PORT = 6000
const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()