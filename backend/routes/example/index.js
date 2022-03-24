'use strict'

'use strict'
const {
  knex
} = require('../../database');

const { updateDonor} = require('../../controller/model')


module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // return 'this is an example'
    // SELECT * FROM book WHERE completed_at > now() - interval '30 day'
    // SELECT * FROM "donors" left join blood_donation on blood_donation.donors_id = donors.id where blood_donation.donated_time < ( now()-'90 days'::interval ) LIMIT 50
    return knex.with('with_alias', knex.raw("SELECT * FROM donors left join blood_donation on blood_donation.donors_id = donors.id where blood_donation.donated_time  < now() - interval '90 day' LIMIT 50")).select('*').from('with_alias')
    return knex.with('with_alias', knex.raw("SELECT * FROM blood_donation WHERE donated_time < now() - interval '90 day'")).select('*').from('with_alias')
  })

  fastify.get('/test', async function (request, reply) {
    const subquery = knex.select('donors_id').from('blood_donation').whereRaw('donated_time > ? - ?::INTERVAL', [knex.fn.now(), '90 day']);
    return knex.select('*').from('donors')
    .whereNotIn('id', subquery)
  })
  fastify.post('/update', async (request, reply) => {
    reply.send(request.body.donors_id);
  })
}
