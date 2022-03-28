const { getBloodGroups } = require('../../controller/model');

const { validateUser } = require('../../controller/validateuser');

module.exports = async function (fastify, opts,done){

fastify.get('/', async (req,reply)=>{
    var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getBloodGroups()
})


fastify.get('/:id', async (req,reply)=>{
    var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
    return await getBloodGroups(req.params.id)
})

done()
}
