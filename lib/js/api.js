const BASE_URL = "http://localhost:5000";

function getDistrict(){
    return fetch(BASE_URL+'/district')
}
export default{
    getDistrict,
}