const { getDonerById } = require('../../controllers/blood-donors/index')
const { getDonerByFilter } = require('../../controllers/blood-donors/index')
function itemRoutes(fastify, options, done){

// fastify.get('/donors', async (req,reply)=>{
//     return await getBlockPanchayathsFilter(req.query)
// })
// ID
fastify.get('/donors/:id', async (req,reply)=>{
    return await getDonerById(req.params.id)
}) 

// Filter & All Fetch

fastify.get('/donors', async (req,reply)=>{
    return await getDonerByFilter(req.query)
})


done()
}
module.exports = itemRoutes