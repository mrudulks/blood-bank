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


function getDonorsList(){
  return   knex.with('with_alias', knex.raw("SELECT * FROM donors left join blood_groups on blood_groups.bid = bloodgroup left join blood_donation on blood_donation.donors_id = donors.id where blood_donation.donated_time < now() - interval '90 day' LIMIT 50")).select('*').from('with_alias')
}

function getAllDonorsList(){
  return   knex.with('with_alias', knex.raw("SELECT * FROM donors left join blood_groups on blood_groups.bid = bloodgroup left join blood_donation on blood_donation.donors_id = donors.id LIMIT 50")).select('*').from('with_alias')
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


async function updateDonor(formData){
  const timeStamp = new Date('2021-10-13')
  var id = 3;
  // Returns [ { id: 42, title: "The Hitchhiker's Guide to the Galaxy" } ]
  // return knex('donors')
  //   .where({ id: id })
  //   .update({ donated_time:timeStamp }, ['id', 'donated_time'])
  // }
  return knex('blood_donation').insert({
      donors_id:id,
      donated_time:timeStamp
  })

}

exports.registerNew = registerNew;
exports.updateDonor =  updateDonor;





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

exports.getDonorsList = getDonorsList;
exports.getAllDonorsList = getAllDonorsList;