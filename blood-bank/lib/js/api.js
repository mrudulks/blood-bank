const BASE_URL = "http://localhost:5000";

function getDistrict(){
    return fetch(BASE_URL+'/district')
}
function getTaluk(districtId){
    return fetch(BASE_URL+'/localbody?district_id='+districtId)
}
function getDonors(bloodGp,districtId,blockPan){
    return fetch(BASE_URL+'/blood_donors/?blood_group='+bloodGp+'&district='+districtId+'&block_panchayaths='+blockPan)
}
export default{
    getDistrict,
    getTaluk,
    getDonors
}