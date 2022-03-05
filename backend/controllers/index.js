const {
    knex
} = require('../db');


async function registerNew(formData){
    return knex('donors').insert({
        name:formData.name,
        phone:formData.phone,
        bloodgroup:formData.bloodgroup,
        district:formData.district,
        block_panchayaths:formData.block_panchayaths,
        email:formData.email
    })
    // const data = await response.json()
}
exports.registerNew = registerNew;