<template>
  <div>

    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">Register for Blood Donation</h2>
      <form action @submit.prevent="registerNew" id="registerForm">
        <div class="row register">
          <div class="col-md-6">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" v-model="register.name">
          </div>
          <div class="col-md-6">
            <label for="bloodgp">Blood Group</label>
            <select name="" id="bloodgp" class="form-control" v-model="register.blood_group">
              <option v-for="items in bloodGroups" :value="items.id" :key="items.id">{{ items.blood_icon}}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="age">Age</label>
            <select name="" id="age" class="form-control" v-model="register.age">
              <option v-for="items in ageLimit" :value="items" :key="items">{{ items }}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="district">District</label>
            <select name="" id="age" class="form-control" v-model="register.district" @change="getBp()">
              <option v-for="items in district" :value="items.id" :key="items.id">{{ items.districtname}}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="bp">Block Panchayath</label>
            <select name="" id="age" class="form-control" v-model="register.blockPanchayath">
              <option v-for="items in  blockPanchayath" :value="items.id" :key="items.id">{{ items.name }}</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="mobileno">Contact Number</label>
            <input type="text" id="mobileno" class="form-control" v-model="register.mobileno">
          </div>

          <div class="col-md-6">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" v-model="register.email">
          </div>
          <div class="col-md-12 text-center">
            <button class="btn btn-primary  mb-3" type="submit">Register</button>
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
     layout: 'custom',
    components: {
      BHeader,
    },
    data() {
      return {
        bloodGroups: [],
        district: [],
        blockPanchayath: [],
        register: {},
        ageLimit: 60
      }
    },
    async fetch() {
      const bloodGp = await api.getBloodGroups();
      if (bloodGp.status == 200) {
        this.bloodGroups = await bloodGp.json();
      }

      // District

      const districtfetch = await api.getDistrict();
      if (districtfetch.status == 200) {
        this.district = await districtfetch.json();
      }

      // District

    },
    methods: {
      async getBp() {
        console.log('Hii')
        const bp = await api.getTaluk(this.register.district);
        if (bp.status == 200) {
          this.blockPanchayath = await bp.json();
        }
      },
      async registerNew() {


        const options = {
          method: 'POST',
          headers: {
            '5e6ed62dec6e44fd94f48a3af3d5b610': '',
            'content-type': 'application/json'
          },
          body: '{"name":"' + this.register.name + '","bloodgroup":"' + this.register.blood_group +
            '","district":"' + this.register.district + '","phone":"' + this.register.mobileno +
            '","block_panchayaths":"' + this.register.blockPanchayath + '","age":"' + this.register.age + '","email":"'+this.register.email+'"}'
        };

        fetch('/api/register', options)
          .then(response => {
            if (response.status == 200) {
              this.$router.push({
                name: 'blood-bank'
              })
            }
          })
        // .then(response => console.log(response))
        // .catch(err => console.error(err));
      }
    }
  }

</script>
<style>
  .card {
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
  }

  .register input,
  .register select {
    margin-bottom: 1.5rem;
  }

</style>
