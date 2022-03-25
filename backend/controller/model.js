const {
  knex
} = require('../database')

function getDistrict(id) {
  if (id == null) {
    return knex.select('*').from('district')
  } else {
    return knex('district').where('id', id)
  }
}


//  User

function getUsers(id) {
  if (id != null) {
    return knex('users').where('id', id)
  } else {
    return knex.select('*').from('users');
  }
}

function userAuth(auth) {
  var obj = {};
  var newArray = [];
  if (auth != null) {
    const keyName = Object.keys(auth);
    for (var i = 0; i < keyName.length; i++) {
      obj[keyName[i]] = auth[keyName[i]]
    }
    newArray.push(obj);
    return knex('users').where(newArray[0])

  }
}

function tokenUpdate(id, tokenId) {
  const timeStamp = new Date(Date.now())
  return knex('users')
    .where({
      id: id
    })
    .update({
      token: tokenId,
      updated_at: timeStamp
    }, ['id', 'token', 'updated_at'])
}


// Logged User
function getLoggedUsers(session) {
  return knex('users').where('token', session)
}


function getDonorsList() {
  const subquery = knex.select('donors_id').from('blood_donation').whereRaw('donated_time > ? - ?::INTERVAL', [knex.fn.now(), '90 day']);
  return knex.select('*').from('donors')
  .whereNotIn('id', subquery)
  // .leftJoin('blood_groups', 'donors.bloodgroup', 'blood_groups.bid')
  .leftJoin('district','donors.district','district.id')
  .orderBy('name');
}


function getDonorBySearch(name){
  console.log(name)
  const subquery = knex.select('donors_id').from('blood_donation').whereRaw('donated_time > ? - ?::INTERVAL', [knex.fn.now(), '90 day']);
  return knex.select('*').from('donors')
  .whereNotIn('id', subquery)
  .leftJoin('blood_groups', 'donors.bloodgroup', 'blood_groups.bid')
  .leftJoin('district','donors.district','district.id')
  .whereLike('name', name)
}


function getAllDonorsList() {
  return knex.select('*').from('donors')
  .leftJoin('blood_groups', 'donors.bloodgroup', 'blood_groups.bid')
  // .leftJoin('blood_donation', 'donors.id', 'blood_donation.donors_id')
}


function deleteDonor(id){
  console.log(id)
  return knex('donors').del(['id']).where({id: id})
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
  if (id != null && id != 'count') {
    return knex('donors').where('id', id)
  } else if (id == "count") {
    return knex('donors').count('id');
  } else {
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
     const subquery = knex.select('donors_id').from('blood_donation')
     .whereRaw('donated_time > ? - ?::INTERVAL', [knex.fn.now(), '90 day']);
     return knex.select('*').from('donors')
     .whereNotIn('id', subquery)
     .leftJoin('blood_groups', 'donors.bloodgroup', 'blood_groups.bid')
     
     .where(newArray[0])
  }
  else{
      return knex.select('*').from('donors');
  }
}


// Blood Groups 
function getBloodGroups(id) {
  if (id != null) {
    return knex('blood_groups').where('id', id)
  } else {
    return knex.select('*').from('blood_groups');
  }
}


async function registerNew(formData) {
  return knex('donors').insert({
    name: formData.name,
    phone: formData.phone,
    bloodgroup: formData.bloodgroup,
    district: formData.district,
    block_panchayaths: formData.block_panchayaths,
    email: formData.email
  })



  // const data = await response.json()
}


async function updateDonor(itemdata) {
  var data = '';
  console.log("Donors id", itemdata.donors_id)
  var donors_id = itemdata.donors_id;
  var donated_time = dateParser(itemdata.donated_time);
  data = knex('blood_donation').where('donors_id', donors_id)
  var item = await data;
  if (item[0]?.donors_id == donors_id) {
    return knex('blood_donation')
      .where({
        donors_id: donors_id
      })
      .update({
        donated_time: donated_time
      }, ['donors_id', 'donated_time'])
  } else {
    return knex('blood_donation').insert({
          donors_id:donors_id,
          donated_time:donated_time
      })
  }
}

function dateParser(date){
  return new Date(date)
}



exports.registerNew = registerNew;
exports.updateDonor = updateDonor;
exports.deleteDonor = deleteDonor;




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
exports.getDonorBySearch = getDonorBySearch;