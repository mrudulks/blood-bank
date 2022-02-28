const { knex } = require('./db');
 function getDonors(id){
     if(id == null){
        return knex.select('*').from('blood_donors')   
     }
     else{
        return knex.with('with_alias',knex.raw('select * from "blood_donors" where "id" = ?',id)).select('*').from('with_alias')
     }
 }
exports.getDonors = getDonors;