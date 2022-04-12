const BASE_URL = "/api";
const FRONT_URL = "http://localhost:8000"
async function myFetch(url, options){
    const res =  await fetch( url, options)
    if(res.status == 403){
       window.location.href= FRONT_URL+'/login'
    }
    return res
}

function totalUsers(){
    return myFetch(BASE_URL+'/donors/count')
}


function getDistrict(id){
    if(id == null){
        return myFetch(BASE_URL+'/districts')
    }
    else{
        return myFetch(BASE_URL+'/districts/'+id)
    }
    
}


function getTaluk(districtId){
    return myFetch(BASE_URL+'/blockpanchayaths?district='+districtId)
}
function getDonors(filter){
    // if(bloodGp)
    // return fetch(BASE_URL+'/donors?blood_group='+bloodGp)
    return myFetch(BASE_URL+'/donors?'+filter)
}


function getAllDonors(){
    return myFetch(BASE_URL+'/donors')
}


// Blood Groups

function getBloodGroups(id,ser){
    if(id != null){
        return myFetch(BASE_URL+'/groups/'+id)
    }
    console.log("My Blood gp",ser)
    return myFetch(BASE_URL+'/groups')
}

function getOrganization(){
    return myFetch(BASE_URL+'/organization')
}

export default{
    getDistrict,
    getTaluk,
    getDonors,
    getBloodGroups,
    getAllDonors,
    totalUsers,
    getOrganization
}