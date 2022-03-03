const items = require('../items');
const { knex } = require('../db');

//Test Page

//Options for get all items
// const getItemsopts = {
//     schema:{
//         response: {
//             200: {
//                 type:'array',
//                 items: {
//                     type:'object',
//                     properties: {
//                         id:{type:'string'},
//                         name:{type:'string'}
//                     }
//                 }
//             }
//         }
//     }
// }

const { getItems } = require('../control')

function itemRoutes(fastify, options, done){
fastify.get('/sql', async (req,reply)=>{
    return await getItems()
})
// ID
fastify.get('/sql/:id', async (req,reply)=>{
    return await getItems(req.params.id)
}) 

done()
}
module.exports = itemRoutes