const {
    knex
} = require('../../db');

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

// New User entry

function adminUserRegister(user) {
    const data = knex('users').where('email', user.email)
    const id = idGen()
    if (!data) {
        return "Already exist"
    } else if (data.email == user.email) {
        return "Email already exists"
    } else {
        var date = new Date(Date.now())

        return knex('users').insert({
            id: id,
            first_name: user.first_name,
            last_name: user.second_name,
            email: user.email,
            password: user.email,
            updated_at: date,
        })
    }

}

// All user fetch and Id filter

function adminUsers(id) {
    if (id != null) {
        return knex('users').where('id', id)
    } else {
        return knex.select('*').from('users');
    }
}

exports.adminUserRegister = adminUserRegister;
exports.adminUsers = adminUsers;