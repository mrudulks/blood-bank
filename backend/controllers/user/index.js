const { knex } = require('../../db');

function getUsers(id){
  if(id != null){
    return knex('users').where('id',id)
  }
    else{
        return knex.select('*').from('users');
    }
}
function userAuth(auth){
    var obj = {};
    var newArray = [];
    if(auth != null){
        const keyName = Object.keys(auth);
        for(var i = 0; i < keyName.length; i++){
            obj[keyName[i]] = auth[keyName[i]]
        }
        newArray.push(obj);
        return knex('users').where(newArray[0])

    }
}


exports.getUsers = getUsers;
exports.userAuth = userAuth;