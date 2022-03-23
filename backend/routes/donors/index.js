const { getDonerById, getDonerByFilter, registerNew,getDonorsList ,getAllDonorsList } = require('../../controller/model')


module.exports = async function (fastify, opts,done){
    fastify.get('/:id', async (req,reply)=>{
        return await getDonerById(req.params.id)
    }) 
    
    // Filter & All Fetch
    
    fastify.get('/', async (req,reply)=>{
        return await getDonorsList(req.query)
    })

    fastify.get('/all', async (req,reply)=>{
        return await getAllDonorsList(req.query)
    })

    fastify.get('/count', async (req, reply) => {
        return await getDonerById('count')
    })

    fastify.post('/register', async (req, reply) => {
        return registerNew(req.body)
    })
    done()
    }