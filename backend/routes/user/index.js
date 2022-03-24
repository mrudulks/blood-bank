'use strict'
const {
    getUsers,
    userAuth,
    tokenUpdate,
    getLoggedUsers
} = require('../../controller/model')



const {
    knex
} = require('../../database');

const crypto = require('crypto');

const sessionStore = {};


function genRandomToken() {
    return crypto.randomBytes(18).toString('base64');
}

function storeUserSession(id, tokenId) {
    console.log("user is is here", id)
    const timeStamp = new Date(Date.now())
    return knex('users')
        .where({
            id: id
        })
        .update({
            token: tokenId,
            updated_at: timeStamp
        }, ['id', 'token', 'updated_at'])
}


function parseCookie(cookieString) {
    const out = {};

    cookieString
        .split(';')
        .map(function (singleCookieStr) {
            const parts = singleCookieStr.trim().split('=');
            out[parts[0]] = parts[1];
        });
    return out;

}


module.exports = async function (fastify, opts, done) {
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
        let userId = data[0].id;
        const loginSessionId = genRandomToken();
        console.log(loginSessionId)
        if (data[0].password == req.body.password) {
            reply
                .header('set-cookie', `usersession=${loginSessionId};path=/api`)
                .send(data);
        }
        await storeUserSession(userId, loginSessionId);
        return "Login Sucess"
    })


    fastify.post('/update', async (req, reply) => {
        return await tokenUpdate(req.body.id, req.body.token)
    })



    // User Logged in Verification 


    fastify.get('/', async (req, reply) => {
        console.log(req.headers);
        if (req.headers) {
            const cookies = parseCookie(req.headers.cookie);
            // console.log("Your cookies",cookies)
            if (cookies.usersession) {
                console.log("user cookie", cookies.usersession);
                let user = await getLoggedUsers(cookies.usersession);
                // console.log(user)
                return user
            } else {
                reply
                    .code(500)
                    .send({
                        hello: 'world'
                    })
            }

        }

    })


    done()
}