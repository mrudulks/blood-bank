'use strict'
const { getBlockPanchayaths,getBlockPanchayathsFilter } = require('../../controller/model')

module.exports = async function (fastify, opts){

fastify.get('/', async (req,reply)=>{
    return await getBlockPanchayathsFilter(req.query)
})
// ID
fastify.get('/:id', async (req,reply)=>{
    return await getBlockPanchayaths(req.params.id)
}) 
}
