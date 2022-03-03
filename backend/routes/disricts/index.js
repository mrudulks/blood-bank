const { knex } = require('../../db');
const { getDistrict } = require('../../controllers/district/')

function itemRoutes(fastify, options, done){
fastify.get('/districts', async (req,reply)=>{
    return await getDistrict()
})
// ID
fastify.get('/districts/:id', async (req,reply)=>{
    return await getDistrict(req.params.id)
}) 

done()
}
module.exports = itemRoutes