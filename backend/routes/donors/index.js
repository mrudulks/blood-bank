const { getDonerById, getDonerByFilter, registerNew,getDonorsList ,getAllDonorsList , updateDonor,getDonorBySearch} = require('../../controller/model')


module.exports = async function (fastify, opts,done){
    fastify.get('/:id', async (req,reply)=>{
        return await getDonerById(req.params.id)
    }) 
    
    // Filter & All Fetch
    
    fastify.get('/', async (req,reply)=>{
        if(req.query.name){
            return await getDonorBySearch(req.query.name)
        }
        else if(req.query){
            return await getDonerByFilter(req.query)
        }
        else{
            return await getDonorsList(req.query)
        }
       
    })

    fastify.get('/all', async (req,reply)=>{
        return await getAllDonorsList(req.query)
    })

    fastify.get('/count', async (req, reply) => {
        return await getDonerById('count')
    })

    fastify.post('/register', async (req, reply) => {
        debugger;
        return registerNew(req.body)
    })

    fastify.post('/update', async (req, reply) => {
        var con = JSON.parse(req.body)
        return updateDonor(con)
    })


    done()
    }