const { getDonerById, getDonerByFilter, registerNew,getUserList } = require('../../controller/model')


module.exports = async function (fastify, opts,done){
    fastify.get('/:id', async (req,reply)=>{
        return await getDonerById(req.params.id)
    }) 
    
    // Filter & All Fetch
    
    fastify.get('/', async (req,reply)=>{
        return await getUserList(req.query)
    })

    fastify.get('/count', async (req, reply) => {
        return await getDonerById('count')
    })

    fastify.post('/register', async (req, reply) => {
        return registerNew(req.body)
    })
    done()
    }