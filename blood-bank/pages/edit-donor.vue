<template>
  <div>

    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">Edit Donor data</h2>
      <form action @submit.prevent="updateDonor" id="registerForm" class="card">
        <div class="row register">
          <div class="col-md-6">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" v-model="register.name">
          </div>
          <div class="col-md-6">
            <label for="bloodgp">Blood Group</label>
            <select name="" id="bloodgp" class="form-control" v-model="register.bloodgroup">
              <option v-for="items in bloodGroups" :value="items.bid" :key="items.bid">{{ items.blood_icon}}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="age">Last Donated</label>
            <input type="date" class="form-control" v-model="register.date">
          </div>

          <div class="col-md-6">
            <label for="mobileno">Contact Number</label>
            <input type="text" id="mobileno" class="form-control" v-model="register.phone">
          </div>

          <div class="col-md-6">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" v-model="register.email">
          </div>
          <div class="col-md-12 text-center">
            <button class="btn btn-primary  mb-3" type="submit">Update</button>
          </div>

        </div>

      </form>
    </section>
  </div>
</template>
<script>
  import BHeader from '~/components/BHeader.vue'
  import api from '~/lib/js/api'
  export default {
    components: {
      BHeader,
    },
    data() {
      return {
        bloodGroups: [],
        district: [],
        blockPanchayath: [],
        register: {},
        ageLimit: 60,
        donor: '',
        register: ''
      }
    },
    methods: {
      async getBp() {
        console.log('Hii')
        const bp = await api.getTaluk(this.register.district);
        if (bp.status == 200) {
          this.blockPanchayath = await bp.json();
        }
      },

      async dataFetch(){
        var id = this.$route.query.id
      var donorData = await fetch('/api/donors/' + id)
      this.donor = await donorData.json()
      this.register = this.donor[0]

      const bloodGp = await api.getBloodGroups();
      if (bloodGp.status == 200) {
        this.bloodGroups = await bloodGp.json();
      }

      // District

      const districtfetch = await api.getDistrict();
      if (districtfetch.status == 200) {
        this.district = await districtfetch.json();
      }
      },


      async updateDonor() {


        const options = {
          method: 'POST',
          body: '{"donors_id":"' + this.register.id + '","donated_time":"' + this.register.date + '"}'
        };

        fetch('/api/donors/update', options)
          .then(response => {
            if (response.status == 200) {
              this.$router.push({
                name: 'all-donors'
              })
            }
          })
        // .then(response => console.log(response))
        // .catch(err => console.error(err));
      }
    },
    mounted(){
      this.dataFetch();
    }
  }

</script>
<style>
  .card {
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
    padding: 1.5rem;
  }

  .register input,
  .register select {
    margin-bottom: 1.5rem;
  }

</style>
