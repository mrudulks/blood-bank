<template>
  <div class="container">
    <header class="p-2">
      <h3 class="text-center text-white">Donors</h3>
    </header>
    <section>
      <div class="row">
        <div class="col-md-4" v-for="donor in donors" :key="donor.id">
            <div class="card p-2">
                <p>{{ donor.name }}</p>
                <p>{{ donor.phone }}</p>
            </div>
          
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import api from '~/lib/js/api'
  export default {
    data() {
      return {
        pageRoute: this.$route.query,
        donors: ''
      }
    },
    async fetch() {
      const district = this.pageRoute.district;
      const blockPanchayath = this.pageRoute.blockpanchayaths;
      const bloodGroup = this.pageRoute.bloodgroup;

      const response = await api.getDonors(bloodGroup, district, blockPanchayath)
      if (response.status == 200) {
        this.donors = await response.json()
      }

    }
  }

</script>
<style >
.card{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
}
</style>