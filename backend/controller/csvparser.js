const {
    knex
} = require('../database')

const csv = require('csv-parser')
const fs = require('fs')
let results = []

let newDist = []
let finalRes = []
let finalResult ;
async function csvUpload(request,reply){
  var newBlock  = [];
  var newBlood = [];
    fs.createReadStream(request.file.destination+request.file.filename)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end',async () => {
        newDist = results.map(v => {
            return v.district.trim().toUpperCase();
        })
        newBlock = results.map(v => {
            return v.block_panchayaths.trim();
        })
        newBlood = results.map(v => {
            return v.bloodgroup
        })
        let districts = await getDistrict(newDist);
        var districtMap = mapDistrict(districts)

        //Blocks
    let blocks = await getBlock(newBlock);
    var newBlocks = mapBlocks(blocks);
    //Blood Groups
    let bloodGroup = await getBloodGroup(newBlood)
    var bloodMap = mapBlood(bloodGroup)

    finalRes = mapObject(districtMap, newBlocks,bloodMap);
    results = [];
    return await fileInsert(finalRes,reply);
    });
    // return finalResult
}
//District

function getDistrict(newdistrict) {
    // newdistrict = ['THRISSUR', 'THIRUVANANTHAPURAM', 'MALAPPURAM', 'PALAKKAD', 'THRISSUR', 'MALAPPURAM']
    return knex.select('id', 'districtname').from('district').whereIn('districtname', newdistrict)
}

function mapDistrict(districtsData) {
    var obj = {}
    districtsData.map(v => {
        obj[v.districtname?.trim()] = v.id
    })
    return obj
}
// Blocks
function getBlock(blocks) {
    // blocks = ['Chittur', 'Thrissur'];
    return knex.select('id', 'name').from('block_panchayaths').whereIn('name', blocks)
  }

  function mapBlocks(newBlocks) {
    var obj = {};
    newBlocks.map(v => {
      obj[v.name] = v.id
    })
    return obj
  }

//Blood Groups
function getBloodGroup(bloodGroups){
    // bloodGroups = ['B Positive','A Positive']
    return knex.select('bid','blood_group').from('blood_groups').whereIn('blood_group',bloodGroups)
}
function mapBlood(bloodGroup){
    var obj = {}
    bloodGroup.map( v =>{
      obj[v.blood_group] = v.bid
    })
    return obj
  }


//Insertion
function mapObject(districtMap, newBlocks, bloodMap) {
    var newData = results.map(v => {
      var str = v;
      str.district = districtMap[v.district.toUpperCase()];
      str.block_panchayaths = newBlocks[v.block_panchayaths];
      str.bloodgroup = bloodMap[v.bloodgroup];
      return v
    })
    console.log(newData)
    return newData
  }
  async function fileInsert(newItems,reply) {
    try {
        const ite =  await knex('donors').insert(newItems)
        reply.status(200).send({mesage:"Success"})
  } catch (error) {
    console.log(error)
      let obj = {message:"There was a error in column "+error.column,
                details:error.detail}
      // return obj
    reply.status(200).send(obj)
  }
  }

exports.csvUpload = csvUpload;