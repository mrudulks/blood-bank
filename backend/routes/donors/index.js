const { getDonerById, getDonerByFilter, registerNew,getDonorsList ,getAllDonorsList , updateDonor,getDonorBySearch,deleteDonor} = require('../../controller/model')

const { validateUser } = require('../../controller/validateuser')

module.exports = async function (fastify, opts,done){
    fastify.get('/:id', async (req,reply)=>{
        return await getDonerById(req.params.id)
    }) 
    
    // Filter & All Fetch
    
    fastify.get('/', async (req,reply)=>{
        if(req.query.name){
            var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
            return await getDonorBySearch(req.query.name)
        }
        else if(req.query){
            var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
            return await getDonerByFilter(req.query)
        }
        else{
            var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
            return await getDonorsList(req.query)
        }
       
    })

    fastify.get('/all', async (req,reply)=>{
        var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
        return await getAllDonorsList(req.query)
    })

    fastify.get('/count', async (req, reply) => {
        var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
        return await getDonerById('count')
    })

    fastify.post('/register', async (req, reply) => {
        return registerNew(req.body)
    })

    fastify.post('/update', async (req, reply) => {
        var con = JSON.parse(req.body)
        return updateDonor(con)
    })

    fastify.get('/delete/:id',async(req, reply)=>{
        var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
        return deleteDonor(req.params.id) 
    })


    done()
    }