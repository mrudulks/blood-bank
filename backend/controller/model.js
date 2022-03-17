const { knex } = require('../database')
 function getDistrict(id){
     if(id == null){
        return knex.select('*').from('district')   
     }
     else{
      return knex('district').where('id', id)
     }
 }


//  User

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


// Logged User
function getLoggedUsers(session){
  return knex('users').where('token',session)
}




//BlockPanchayaths

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

// Blood Donors 

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
      return knex('donors').where(newArray[0])
   }
   else{
       return knex.select('*').from('donors');
   }
} 


// Blood Groups 
function getBloodGroups(id) {
  if(id != null){
    return knex('blood_groups').where('id', id)
  }
  else {
    return knex.select('*').from('blood_groups');
  } 
}









exports.tokenUpdate = tokenUpdate;
exports.getUsers = getUsers;
exports.userAuth = userAuth;
exports.getLoggedUsers = getLoggedUsers;

exports.getDistrict = getDistrict;

exports.getBlockPanchayaths = getBlockPanchayaths;
exports.getBlockPanchayathsFilter = getBlockPanchayathsFilter;

exports.getDonerById = getDonerById;
exports.getDonerByFilter = getDonerByFilter;

exports.getBloodGroups = getBloodGroups;