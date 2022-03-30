'use strict'
const { getDistrict } = require('../../controller/model')
const { validateUser } = require('../../controller/validateuser')

// module.exports = async function (fastify, opts) {
module.exports = async function (fastify, opts) {
  fastify.get('/', async (req,reply)=>{
    var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getDistrict()
    // reply.code(403).send("Items")
})
// ID
fastify.get('/:id', async function (request, reply) {
  var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getDistrict(request.params.id)
}) 
}
