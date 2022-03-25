<template>
  <div>
    <section class="container pt-5">
      <div class="row">
        <p v-if="donors == ''" class="text-center text-white">No items Found</p>
        <div class="col-md-12">
          <div class="tablecard card mt-4">
            <table class="table">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Name</th>
                  <th scopr="col">Blood Group</th>
                  <th scope="col">Phone </th>
                </tr>
              </thead>
              <tbody>
                <!-- ----- -->
                <tr v-for="items in donors" :key="items.id">
                  <td>{{ items.name }}</td>
                  <td>{{ items.bloodIcon }}</td>
                  <td><a :href="'tel:+91'+items.phone">{{ items.phone }}</a></td>
                </tr>
                <!-- ----- -->
              </tbody>
            </table>
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
  import {
    donorsList
  } from '~/lib/js/model'
  export default {
    components: {
      BHeader,
    },
    data() {
      return {
        pageRoute: this.$route.query,
        donors: '',
        bloodGroups: [],
        district: [],
        filter: ''
      }
    },

    methods: {
      async dataFetch() {
        this.filter = model.filterString(this.pageRoute)
        const response = await api.getDonors(this.filter)
        if (response.status == 200) {
          var jsonDate = await response.json()
          this.donors = donorsList.fromArray(jsonDate)
        }

        // Blood Groups

        const bloodGp = await api.getBloodGroups(bloodGroup);
        if (bloodGp.status == 200) {
          this.bloodGroups = await bloodGp.json();
        }

        // District

        const districtfetch = await api.getDistrict(dist);
        if (districtfetch.status == 200) {
          this.district = await districtfetch.json();
        }
      }
    },
    mounted() {
      this.dataFetch();
    }
  }

</script>
<style>
  .card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
  }

</style>
