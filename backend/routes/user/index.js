const {getUsers,getUserById} = require('../../controllers/user/index')

function itemRoutes(fastify, options, done){
    fastify.get('/users',async(req,reply)=>{
        // return await getUsers()
        // reply.send("Hello world")
        return await getUsers(req.query)
    })

    fastify.get('/users/:id',async(req,reply)=>{
        return await getUserById(req.params.id)
    })

    done()
}

module.exports = itemRoutes;