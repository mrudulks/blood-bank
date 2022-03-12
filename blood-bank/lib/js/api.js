const BASE_URL = "http://localhost:5000";

function getDistrict(id){
    if(id == null){
        return fetch(BASE_URL+'/districts')
    }
    else{
        return fetch(BASE_URL+'/districts/'+id)
    }
    
}
function getTaluk(districtId){
    return fetch(BASE_URL+'/blockpanchayths?district='+districtId)
}
function getDonors(bloodGp,districtId,blockPan){
    if(bloodGp)
    // return fetch(BASE_URL+'/donors?blood_group='+bloodGp)
    return fetch(BASE_URL+'/donors?bloodgroup='+bloodGp+'&district='+districtId+'&block_panchayaths='+blockPan)
}

// Blood Groups

function getBloodGroups(id){
    if(id != null){
        return fetch(BASE_URL+'/bloodgroups/'+id)
    }
    return fetch(BASE_URL+'/bloodgroups')
}

export default{
    getDistrict,
    getTaluk,
    getDonors,
    getBloodGroups
}