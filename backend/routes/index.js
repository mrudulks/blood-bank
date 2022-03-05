const { registerNew } = require('../controllers/index')
const addBlogValidation = {
    body: {
        type: 'object',
        required: [
            'req.body.name'
        ],
        properties: {
            name: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' }
            }
        }
    }
}
function itemRoutes(fastify, options, done){
    fastify.post('/register',addBlogValidation,async (req,reply)=>{
         return  registerNew(req.body)
     })
// ID
// fastify.get('/districts/:id', async (req,reply)=>{
//     return await getDistrict(req.params.id)
// }) 

done()
}
module.exports = itemRoutes