const { knex } = require('../../db');
const { getBloodGroups } = require('../blood-groups');

function getUsers(filter){
    var obj = {};
    var newArray = [];
    if(filter != null){
        const keyName = Object.keys(filter);
        for(var i = 0; i < keyName.length; i++){
            obj[keyName[i]] = filter[keyName[i]]
        }

        newArray.push(obj);
        return knex('users').where(newArray[0])

    }
    else{
        return knex.select('*').from('users');
    }
}

function getUserById(id){
    return knex('users').where('id',id)
}



exports.getUsers = getUsers;
exports.getUserById = getUserById;