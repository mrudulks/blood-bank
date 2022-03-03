const { getBloodGroups } = require('../../controllers/blood-groups/index')
function itemRoutes(fastify, options, done){

fastify.get('/bloodgroups', async (req,reply)=>{
    return await getBloodGroups()
})
fastify.get('/bloodgroups/:id', async (req,reply)=>{
    return await getBloodGroups(req.params.id)
})

done()
}
module.exports = itemRoutes