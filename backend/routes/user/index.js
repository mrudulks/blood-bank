const {
    getUsers,
    userAuth,
    tokenUpdate
} = require('../../controllers/user/index')

function itemRoutes(fastify, options, done) {
    fastify.get('/users', async (req, reply) => {
        // return await getUsers()
        // reply.send("Hello world")
        return await getUsers()
    })

    fastify.get('/users/:id', async (req, reply) => {
        return await getUsers(req.params.id)
    })

    fastify.get('/auth', async (req, reply) => {
        return await userAuth(req.query)
    })

    fastify.post('/auth', async (req, reply) => {
        var data = await userAuth(req.body)
        
        console.log(data[0].password)
        if (data[0].password == req.body.password) {
            const token = await reply.jwtSign({
                name: 'foo',
                role: ['admin', 'spy']
            })
            // const token = fastify.jwt.sign({ 'id':data[0].id })

            reply
            .header('Access-Control-Allow-Origin', '*')
                .header('Content-Type', 'application/json; charset=utf-8')
                .setCookie('access_token', token, {
                    // domain: "http://localhost:3000/",
                    path: "/",
                    secure: true,
                    httpOnly: true,
                    sameSite: 'lax',
                    expires: new Date(Date.now() + 900000)
                })
                .code(200)
                .send({
                    token,
                    data
                })
            await tokenUpdate(data[0].id, token)
        }
    })


    fastify.post('/update', async (req, reply) => {
        return await tokenUpdate(req.body.id, req.body.token)
    })

    done()
}


module.exports = itemRoutes;