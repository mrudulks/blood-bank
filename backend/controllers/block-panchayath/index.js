const {
   knex
} = require('../../db');

function getBlockPanchayaths(id) {

   return knex('block_panchayaths').where('id', id)
}

function getBlockPanchayathsFilter(filter) {
   var obj = {};
   var newArray = [];
   if (filter != null) {

      const keyName = Object.keys(filter)
      for (var i = 0; i < keyName.length; i++) {
         console.log(keyName[i])
         obj[keyName[i]] = filter[keyName[i]]
         
      }
      newArray.push(obj)
      return knex('block_panchayaths').where(newArray[0])
   } else {}
   // return filter
}

exports.getBlockPanchayaths = getBlockPanchayaths;
exports.getBlockPanchayathsFilter = getBlockPanchayathsFilter;