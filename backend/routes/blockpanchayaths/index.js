'use strict'
const { getBlockPanchayaths,getBlockPanchayathsFilter } = require('../../controller/model')

const { validateUser } = require('../../controller/validateuser')

module.exports = async function (fastify, opts){

fastify.get('/', async (req,reply)=>{
    var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getBlockPanchayathsFilter(req.query)
})
// ID
fastify.get('/:id', async (req,reply)=>{
    var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getBlockPanchayaths(req.params.id)
}) 
}
