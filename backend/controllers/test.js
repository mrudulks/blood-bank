const {
    knex
} = require('../db');

function insertTable(id) {
    knex('blood_donors').insert({
            name: 'imruuuu',
            phone:'759999sddsdss',
            blood_group:1,

        })
        .then(res => res.json())
       
    // knex('donors').insert({name: 'b'}).returning('*').toString();
}
exports.insertTable = insertTable;