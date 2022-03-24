<template>
  <div >
  <b-header></b-header>
    <section class="container pt-5">
      <div class="row">
        <p v-if="donors == ''" class="text-center text-white">No items Found</p>
        <div v-else class="col-md-3 mb-5" v-for="donor in donors" :key="donor.id">
            <div class="card p-2 text-center">
                <div class="pro-img">
                    <img src="../lib/images/user-svgrepo-com.svg" alt="" srcset="">
                </div>
                <p class="font-weight-bold text-capitalize"> {{ donor.name }}</p>
                <p>{{ donor.phone }}</p>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import BHeader from '~/components/BHeader.vue'
  import api from '~/lib/js/api'
  import model from '~/lib/js/model'
  export default {
    components:{
      BHeader,
    },
    data() {
      return {
        pageRoute: this.$route.query,
        donors: '',
        bloodGroups:[],
        district:[]
        
      }
    },
    async fetch() {
      const dist = this.pageRoute.district;
      const Panchayath = this.pageRoute.blockpanchayaths;
      const bloodGroup = this.pageRoute.bloodgroup;
      var filter = {};
      filter = donorFilter(this.pageRoute)
      const response = await api.getDonors(bloodGroup,dist,Panchayath)
      if (response.status == 200) {
        this.donors = await response.json()
      }

    // Blood Groups

    const bloodGp = await api.getBloodGroups(bloodGroup);
    if(bloodGp.status == 200){
      this.bloodGroups = await bloodGp.json();
    }

    // District

    const districtfetch = await api.getDistrict(dist);
    if(districtfetch.status == 200){
      this.district = await districtfetch.json();
    }
    
    }
  }

</script>
<style >
.card{
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
}
</style>