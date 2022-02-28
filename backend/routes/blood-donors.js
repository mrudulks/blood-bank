const items = require('../items');
const { knex } = require('../db');
const { getDonors } = require('../control')

function itemRoutes(fastify, options, done){
fastify.get('/blood-donors', async (req,reply)=>{
    return await getDonors()
})
// ID
fastify.get('/blood-donors/:id', async (req,reply)=>{
    return await getDonors(req.params.id)
}) 

done()
}
module.exports = itemRoutes