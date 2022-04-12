'use strict'
const {
    getUsers,
    userAuth,
    tokenUpdate,
    getLoggedUsers,
    getDonerByFilter
} = require('../../controller/model')


const {
    adminUserRegister,checkUserExist,deleteUser
} = require('../../controller/newuser')

const {
    knex
} = require('../../database');

const crypto = require('crypto');

const Joi = require('joi');
const { request } = require('http');
const { func } = require('joi');

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

function sessionData(userid,sessionid,userdata){
    return knex('session').insert({
        user_id:userid,
        token:sessionid,
    })
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


async function validateUser(req, reply) {
    if (req.headers) {
        if (!req.headers.cookie) {
            reply
                .code(403)
                .send({
                    message: 'not logged in'
                })
        } else {
            const cookies = parseCookie(req.headers.cookie);
            if (cookies.usersession) {
                console.log("user cookie", cookies.usersession);
                let user = await getLoggedUsers(cookies.usersession);
                return user
            } else {
                reply
                    .code(403)
                    .send({
                        message: 'not logged in'
                    })
            }
        }

    }
}



module.exports = async function (fastify, opts, done) {
    fastify.get('/users', async (req, reply) => {
        // return await getUsers()
        // reply.send("Hello world")
        return await getUsers()
    })

    fastify.delete('/users/:id', async (req, reply) => {
        return await deleteUser(req.params.id)
    })

    fastify.get('/users/:id', async (req, reply) => {
        var validUser = await validateUser(req, reply)
        if (!validUser) {
            return
        }
        return await getUsers(req.params.id)
    })


    fastify.get('/newauth', async (req, reply) => {
        var validUser = await validateUser(req, reply)
        if (!validUser) {
            return
        }
        return await userAuth(req.query)
    })

    fastify.post('/auth', async (req, reply) => {
        var data = await userAuth(req.body)
        var userData = data[0]
        console.log(data[0].password)
        let userId = data[0].id;
        const loginSessionId = genRandomToken();
        console.log(loginSessionId)
        if (data[0].password == req.body.password) {
            reply
                .header('set-cookie', `usersession=${loginSessionId};path=/api`)
                .send(data);
        }
        await sessionData(userId, loginSessionId, userData);
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
            if (!req.headers.cookie) {
                reply
                    .code(403)
                    .send({
                        message: 'please Login'
                    })
            } else {
                const cookies = parseCookie(req.headers.cookie);
                // console.log("Your cookies",cookies)
                if (cookies.usersession) {
                    console.log("user cookie", cookies.usersession);
                    let user = await getLoggedUsers(cookies.usersession);
                    // console.log(user)
                    if(user == ''){
                        reply.code(403).send({message:'Please Login'})
                    }
                    else{
                        return user
                    }
                }

            }

        }

    })

    //New User Insert
    fastify.get('/newuser', async (req, reply) => {
        return "Hiiii imru"
    })

    fastify.post('/', async (req, reply) => {

        //Request Validation
        const { error } = validateRequest(req.body);
        if(error){
            return reply.status(400).send(error.message)
        } 

        //Check User Already Exists
        const results = await checkUserExist(req,reply);
        if(results){
           
                return reply.status(403).send(results.message)
        }
        else{
            try{
                const newRes =  await adminUserRegister(req.body)
                return ne
            }
            catch(error){
                let obj = {mesage:"There was a error in column "+error.column,
                details:error.detail}
                return obj
            }
            
        }   
    })


    fastify.get('/new', async (req, reply) => {
        console.log(req.headers)
        const cookieString = req.headers.cookie;
        var cookiestring = parseCookie(cookieString)
        var usersession = cookiestring.usersession;
        const session = await sessionFetch(usersession);
        const userId = session[0].user_id;
        const userData = await userDataFetch(userId)
        console.log(userData)
        return userData
    })

    done()
}
function sessionFetch(usersession){
    return knex('session').where('token',usersession)
}
function userDataFetch(userId){
    return knex('users').select('first_name','last_name','email','o_id').where('id',userId)
}
function validateRequest(request){
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        last_name: Joi.string()
            .required(),
        email: Joi.string()
            .required(),

        password: Joi.string()
            .min(8)
            .required(),
        o_id:Joi.string()
    })

    return schema.validate(request);
}

