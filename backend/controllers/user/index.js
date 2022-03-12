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

function tokenUpdate(id,tokenId){
  const timeStamp = new Date(Date.now())
// Returns [ { id: 42, title: "The Hitchhiker's Guide to the Galaxy" } ]
return knex('users')
  .where({ id: id })
  .update({ token:tokenId ,updated_at:timeStamp }, ['id', 'token','updated_at'])
}

exports.tokenUpdate = tokenUpdate;
exports.getUsers = getUsers;
exports.userAuth = userAuth;