const { getBloodGroups } = require('../../controller/model')
module.exports = async function (fastify, opts,done){

fastify.get('/', async (req,reply)=>{
    return await getBloodGroups()
})
fastify.get('/:id', async (req,reply)=>{
    return await getBloodGroups(req.params.id)
})

done()
}
