const { getDonerById, getDonerByFilter, registerNew,getDonorsList ,getAllDonorsList , updateDonor,getDonorBySearch,deleteDonor, getDonorsOid} = require('../../controller/model')

const { validateUser } = require('../../controller/validateuser')

const { csvUpload } = require('../../controller/csvparser')

const multer = require('fastify-multer')
const upload = multer({ dest: '../uploads/' })

module.exports = async function (fastify, opts,done){
    // Multer Register
    fastify.register(multer.contentParser)
    
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

    fastify.get('/all/:oid', async (req,reply)=>{
        var validUser = await validateUser(req,reply)
            if(!validUser){
                return 
            }
        return await getAllDonorsList(req.params.oid)
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

    fastify.get('/oid/:oid',async(req, reply)=>{
        // var validUser = await validateUser(req,reply)
        //     if(!validUser){
        //         return 
        //     }
        return getDonorsOid(req.params.oid) 
    })

    // Upload donors file 

    fastify.route({
        method: 'POST',
        url: '/upload',
        preHandler: upload.single('avatar'),
        handler: async function(request, reply) {
          console.log(request.file.filename)
          return csvUpload(request,reply)
        }
      })

    done()
    }