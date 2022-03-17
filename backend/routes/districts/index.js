'use strict'
const { getDistrict } = require('../../controller/model')

// module.exports = async function (fastify, opts) {
module.exports = async function (fastify, opts) {
  fastify.get('/', async (req,reply)=>{
    return await getDistrict()
})
// ID
fastify.get('/:id', async function (request, reply) {
    return await getDistrict(request.params.id)
}) 
}
