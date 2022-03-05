const items = require('../items')
const {insertTable} = require('../controllers/test')
//Test page
//Options for get all items
const getItemsopts = {
    schema:{
        response: {
            200: {
                type:'array',
                items: {
                    type:'object',
                    properties: {
                        id:{type:'string'},
                        name:{type:'string'}
                    }
                }
            }
        }
    }
}

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
  
fastify.get('/items',(req,reply)=>{
    reply.send(items)
}) 
fastify.get('/items/:id',(req,reply)=>{
    const {id} = req.params 
    
    const item = items.find(item => items.id === id)


    reply.send(item)
})
done()
fastify.post('/items',addBlogValidation,async (req,reply)=>{
   return await insertTable()
    items.push(newitem)
    reply.send(items)
})
}

 


module.exports = itemRoutes