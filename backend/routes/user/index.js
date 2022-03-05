const {getUsers,userAuth } = require('../../controllers/user/index')

function itemRoutes(fastify, options, done){
    fastify.get('/users',async(req,reply)=>{
        // return await getUsers()
        // reply.send("Hello world")
        return await getUsers()
    })

    fastify.get('/users/:id',async(req,reply)=>{
        return await getUsers(req.params.id)
    })

    fastify.get('/auth',async(req,reply)=>{
        return await userAuth(req.query)
    })

    fastify.post('/auth',async(req,reply)=>{
        return await userAuth(req.body)
    })

    done()
}

module.exports = itemRoutes;