const { knex } = require('./db.js');

// function prom1(){
//     return knex.select('id')
//     .from('directus_panels')
//     .then( data => data )
//     .then(data => "mrudul" )
// }

// async function main(){
//     prom1()
//     .then( function(data){
//         console.log('result1 ', data );
//         knex.destroy();
//     });
    
// }
const { getItems } = require('./control')

async function main(){
   return await getItems()
}

async function add(){
    console.log( await main())
}

add();
