const {
    knex
 } = require('../../db');
 
 function getDonerById(id) {
    return knex('blood_donors').where('id', id)
 }
 function getDonerByFilter(filter){
     var obj = {};
     var newArray = [];
     if(filter != null){

        const keyName = Object.keys(filter);
        for(var i = 0; i < keyName.length; i++){
            obj[keyName[i]] = filter[keyName[i]]
        }

        newArray.push(obj)
        return knex('blood_donors').where(newArray[0])
     }
     else{
         return knex.select('*').from('blood_donors');
     }
 } 
 exports.getDonerById = getDonerById;
 exports.getDonerByFilter = getDonerByFilter;