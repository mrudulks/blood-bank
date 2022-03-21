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


function getUserList(){
  return  knex('donors').orderBy('id');
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
  if(id != null && id != 'count'){
  return knex('blood_donors').where('id', id)
  }
    else if(id == "count"){
    return knex('donors').count('status');
  }
  else{
    // return knex('donors').orderBy('name');
    return "Hii my boy"
    
  }
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
      //  return knex.select('*').from('donors');
      return "Hii there"
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

exports.getUserList = getUserList;