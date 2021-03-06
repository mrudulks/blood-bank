export class donorsList {
    constructor(jsonData) {
        this.id = jsonData.id
      this.name = jsonData.name;
      this.bloodGroup = jsonData.blood_group;
      this.phone = jsonData.phone;
      this.lastDonated = dateFormatter(jsonData.donated_time);
      this.status = jsonData.status;
      this.bloodIcon = jsonData.blood_icon;
    }
    static fromArray(jsonArr) {
      return jsonArr.map(v => new donorsList(v));
    }
  }


  function dateFormatter(value){
    if(value){
        var dateTime = value.split('T')
        var date = dateTime[0];
        // newDate.reverse()
        // var day = newDate[0];
        // var month = newDate[1];
        // var year = newDate[2];
        // var date = [day,month,year].join('-')
        return date
    }
    else{
        return null
    }
  }

function filterString(filter){
    var newKeys = Object.keys(filter);
    var newArray = [];
    for (let i = 0; i < newKeys.length;i++){
        let str = newKeys[i]+'='+filter[newKeys[i]]
        newArray.push(str);
        console.log("Your items",newArray)
    }
    let newFilter = newArray.join('&')
    return newFilter;
}
export default{
  filterString
}