const {
    knex
 } = require('../../db');
 
 function getBloodGroups(id) {
    if(id != null){
      return knex('blood_groups').where('id', id)
    }
    else {
      return knex.select('*').from('blood_groups');
    } 
 }
 exports.getBloodGroups = getBloodGroups;
