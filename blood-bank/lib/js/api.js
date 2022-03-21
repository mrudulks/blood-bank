const BASE_URL = "/api";

function totalUsers(){
    return fetch(BASE_URL+'/donors/count')
}


function getDistrict(id){
    if(id == null){
        return fetch(BASE_URL+'/districts')
    }
    else{
        return fetch(BASE_URL+'/districts/'+id)
    }
    
}


function getTaluk(districtId){
    return fetch(BASE_URL+'/blockpanchayaths?district='+districtId)
}
function getDonors(bloodGp,districtId,blockPan){
    // if(bloodGp)
    // return fetch(BASE_URL+'/donors?blood_group='+bloodGp)
    return fetch(BASE_URL+'/donors?bloodgroup='+bloodGp+'&district='+districtId+'&block_panchayaths='+blockPan)
}


function getAllDonors(){
    return fetch(BASE_URL+'/donors')
}


// Blood Groups

function getBloodGroups(id){
    if(id != null){
        return fetch(BASE_URL+'/groups/'+id)
    }
    return fetch(BASE_URL+'/groups')
}

export default{
    getDistrict,
    getTaluk,
    getDonors,
    getBloodGroups,
    getAllDonors
}