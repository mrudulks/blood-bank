const  {knex}  = require('./db')
function getUser(){
    var tableItems = [] ;
    var out = {};
    knex.with('with_alias',knex.raw('select * from "directus_users"')).select('*').from('with_alias')
    // with('with_alias',knex.raw('select * from "directus_users"')).select('*').from('with_alias')
      .then(data => {
        tableItems = data;
        var objKeys = Object.keys(tableItems[0]);
        return out = {
          items: tableItems,
          headers: objKeys.map(v => {
            return{
              itemsName:v,
              value:v
            }
          })
        }
        //   console.log('latest data',out);
  
      })
      .catch(err =>{
        
          console.log('error',err)
      })
      console.log("table items :" , out)
  }
  getUser()