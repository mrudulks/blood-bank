const { send } = require('vite');
const {
    knex
} = require('../database');

// Random Id Generation
function idGen() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

//Check User Exists or not

async function checkUserExist(req,reply){
    const data = await knex('users').where('email', req.body.email)
    const result = data;
    console.log(result)
    if(result != ''){
       return {message:"User Alread exists"}
    }
}


// New User entry

async function adminUserRegister(user) {
    const id = idGen()

            var date = new Date(Date.now())
    
            return knex('users').insert({
                id: id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                updated_at: date,
            })
}

// All user fetch and Id filter

function adminUsers(id) {
    if (id != null) {
        return knex('users').where('id', id)
    } else {
        return knex.select('*').from('users');
    }
}

//Delete User
function deleteUser(id){
    return knex('users').del(['id']).where({id: id})
}


exports.adminUserRegister = adminUserRegister;
exports.adminUsers = adminUsers;
exports.checkUserExist = checkUserExist;
exports.deleteUser = deleteUser;