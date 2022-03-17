'use strict'
const {
  knex
} = require('../database');

const crypto = require('crypto');

const sessionStore = {};

const api = require('../controller/model')

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


async function getSession(sessionId){
var out = {};
var data = await knex('session').where({
  'token':sessionId
}).select('count')
return data[0].count
}