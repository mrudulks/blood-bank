const { getOrganization,newOrganization } = require('../../controller/model')


const Joi = require('joi');

module.exports = async function (fastify, opts){
    fastify.get('/', async (req,reply)=>{
        return await getOrganization();
    })
    fastify.get('/:id', async (req,reply)=>{
        return await getOrganization(req.params.id);
    })
    fastify.post('/', async (req,res) =>{
        const { error } = validateRequest(req.body);
        if(error){
            return res.status(400).send(error.message)
        } 
        else{
            return newOrganization(req.body);
        }
       
    })
}

function validateRequest(request){
    const schema = Joi.object({
        name: Joi.string()
                .required()
    })

    return schema.validate(request);
}