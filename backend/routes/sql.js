// const items = require('../items');
// const { knex } = require('../db');

//Test Page

//Options for get all items
// const getItemsopts = {
//     schema:{
//         response: {
//             200: {
//                 type:'array',
//                 items: {
//                     type:'object',
//                     properties: {
//                         id:{type:'string'},
//                         name:{type:'string'}
//                     }
//                 }
//             }
//         }
//     }
// }

// const { getItems } = require('../control')

// function itemRoutes(fastify, options, done){
// fastify.get('/sql', async (req,reply)=>{
//     return await getItems()
// })
// // ID
// fastify.get('/sql/:id', async (req,reply)=>{
//     return await getItems(req.params.id)
// }) 

// done()
// }
// module.exports = itemRoutes


const fastify = require('fastify')()
const jwt = require('fastify-jwt')

fastify.register(jwt, {
  secret: 'key',
  cookie: {
    cookieName: 'token'
  }
})

fastify
  .register(require('fastify-cookie'))

fastify.get('/cookies', async (request, reply) => {
  const token = await reply.jwtSign({
    name: 'foo',
    role: ['admin', 'spy']
  })

reply
    .setCookie('token', token, {
      domain: '*',
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true
    })
    .code(200)
    .send('Cookie sent')
})

fastify.get('/verifycookie', async (request, reply) => {
  try {
    await request.jwtVerify()
    reply.send({ code: 'OK', message: 'it works!' })
  }
  catch(error){
    reply.send(error);
  }
})

fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})