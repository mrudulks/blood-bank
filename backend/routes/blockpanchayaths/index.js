const { getBlockPanchayaths } = require('../../controllers/block-panchayath/index')
const{ getBlockPanchayathsFilter } =require('../../controllers/block-panchayath/index')
function itemRoutes(fastify, options, done){

fastify.get('/blockpanchayths', async (req,reply)=>{
    return await getBlockPanchayathsFilter(req.query)
})
// ID
fastify.get('/blockpanchayths/:id', async (req,reply)=>{
    return await getBlockPanchayaths(req.params.id)
}) 



done()
}
module.exports = itemRoutes