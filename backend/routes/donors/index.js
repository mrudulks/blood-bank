const { getDonerById, getDonerByFilter } = require('../../controller/model')


module.exports = async function (fastify, opts,done){
    fastify.get('/:id', async (req,reply)=>{
        return await getDonerById(req.params.id)
    }) 
    
    // Filter & All Fetch
    
    fastify.get('/', async (req,reply)=>{
        return await getDonerByFilter(req.query)
    })

    fastify.get('/count', async (req, reply) => {
        return await getDonerById('count')
    })


    done()
    }