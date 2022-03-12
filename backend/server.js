// ESM
// import Fastify from 'fastify'
// const fastify = Fastify({
//   logger: true
// })
// CommonJs

const qs = require('qs')
const fastify = require('fastify')({
  logger: true,
  querystringParser: str => qs.parse(str)
})

// Swagger

fastify.register(require('fastify-cors'), { 
  // put your options here
  // origin: ['http://127.0.0.1:5000'],
  //       optionsSuccessStatus: 200,
  //       credentials: true
})

fastify.register(require('fastify-jwt'), {
  secret: 'secret',
  cookie: {
    cookieName: 'token'
  }
})

fastify.register(require('fastify-cookie'), {
})

fastify.register(require('./routes/items'));
fastify.register(require('./routes/blood-donors'));
fastify.register(require('./routes/disricts/'));
fastify.register(require('./routes/blockpanchayaths/index'))
fastify.register(require('./routes/bloodDonors/index'))
fastify.register(require('./routes/blood-groups/index'))
fastify.register(require('./routes/index'))
fastify.register(require('./routes/user/index'))
fastify.register(require('./routes/admin/index'))
// fastify.get('/', function (request, reply) {
//   reply.send({ hello: 'world' })
// })

const crypto =require('crypto');

const sessionStore = {};


function genRandomToken(){
  return crypto.randomBytes(18).toString('base64');
}

function parseCookie( cookieString ){
  const out = {};

  cookieString
    .split(';')
    .map(function( singleCookieStr ){
      const parts = singleCookieStr.trim().split('=');
      out[ parts[0] ] = parts[1];
    });

  return out;

}



function storeSessionData( sessionId, data ){
  sessionStore[sessionId] = data;
}


function getSessionData( sessionId ){
  return sessionStore[sessionId];
}


fastify.get('/', async (request, reply) => {
  console.log( 'Headers',  request.headers );
  if( request.headers.cookie ){
    console.log('Inside first if');
    const cookies  = parseCookie( request.headers.cookie );
    console.log('parse cookie', cookies);
    if( ! cookies.sessionid ){
      reply.header('set-cookie', `sessionid=${genRandomToken()}`);
    }
  } else {
    reply.header('set-cookie', `sessionid=${genRandomToken()}`);
  }
  reply.send("Hiddddi")
})




const PORT = 5000
const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()