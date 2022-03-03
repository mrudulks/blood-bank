const { knex } = require('../../db');
 function getDistrict(id){
     if(id == null){
        return knex.select('*').from('district')   
     }
     else{
      return knex('district').where('id', id)
     }
 }
exports.getDistrict = getDistrict;