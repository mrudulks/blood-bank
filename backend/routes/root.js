'use strict'
const {
  knex
} = require('../database');

const crypto = require('crypto');

const sessionStore = {};

function genRandomToken() {
  return crypto.randomBytes(18).toString('base64');
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


function storeSessionData(sessionId, data) {
  sessionStore[sessionId] = data;
}


function getSessionData(sessionId) {
  return sessionStore[sessionId];
}


function insertSession(sessionId, data){
return knex('session').insert({
    token:sessionId,
    count:1
})
}


function updateSession(sessionId, data){
  const timeStamp = new Date(Date.now())
  return knex('session')
  .where({ token: sessionId })
  .update({ count:data }, ['token', 'count'])
}


async function getSession(session){
var out = {};
var data = await knex('session').where({
  'token':session
}).select('count')
debugger;
return data[0].count || 1
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
   
    let viewCount;
    let sessionId;
    if (request.headers.cookie) {
      const cookies = parseCookie(request.headers.cookie);
      if (cookies.sessionid) {
      viewCount = await getSession(cookies.sessionid)
        viewCount++
        
        storeSessionData(cookies.sessionid, viewCount || 1)
        console.log(sessionStore)
        return updateSession(cookies.sessionid, viewCount || 1)
      } else {
        sessionId = genRandomToken()
        reply.header('set-cookie', `sessionid=${sessionId}`);
        viewCount = 1
        storeSessionData(sessionId, viewCount)
        // console.log(sessionStore)
        return updateSession(sessionId, viewCount)
      }
    } else {
      debugger;
      sessionId = genRandomToken()
      reply.header('set-cookie', `sessionid=${sessionId}`);
      viewCount = 1
      storeSessionData(sessionId, viewCount)
      // console.log(sessionStore)
      return insertSession(sessionId, viewCount)
    }
  })

}
