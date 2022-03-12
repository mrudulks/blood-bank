const { adminUserRegister,adminUsers } = require('../../controllers/admin/index')


function itemRoutes(fastify, options, done){
    fastify.get('/admin/users',async(req,reply)=>{
        return await adminUsers()
    })
    fastify.get('/admin/users/:id',async(req,reply)=>{
        return await adminUsers(req.params.id)
    })
    fastify.post('/admin/users',async(req,reply)=>{
        // reply.send(req.body)
        return  await adminUserRegister(req.body)
    })

    done()
}

module.exports = itemRoutes;


