<template>
  <div>

    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">Register for Blood Donation</h2>
      <form action @submit.prevent="registerNew" id="registerForm" class="card">
        <div class="row register">
          <div class="col-md-6">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" v-model="register.name">
          </div>
          <div class="col-md-6">
            <label for="bloodgp">Blood Group</label>
            <select name="" id="bloodgp" class="form-control" v-model="register.blood_group">
              <option v-for="items in bloodGroups" :value="items.bid" :key="items.bid">{{ items.blood_icon}}</option>
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

        <div class="row">
          <div class="col-md-12">
            <div class="card row">
              
                <h6 class="d-flex w-100">Upload file(CSV)</h6> 
              
            
            <input type="file" name="" id="file" ref="myFiles" @change="check($event)">
            <button @click="dataInsert()" class="btn primary-btn">Upload</button>
            <div class="error-box pt-2 text-danger" v-if="errorMsg.details">
              <p>{{errorMsg.message}}</p>
              <p>{{errorMsg.details}}</p>
            </div>
          </div>
          </div>
          <div class="col-md-12">
            
            
          </div>
        </div>
    </section>
  </div>
</template>
<script>
  import BHeader from '~/components/BHeader.vue'
  import axios from 'axios'
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
        files: '',
        errorMsg:{
          details:'',
          message:''
        },
        data:{}
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
      async check(event) {
        let data = new FormData();
        let file = event.target.files[0];
        console.log(file)
      },
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
            '","block_panchayaths":"' + this.register.blockPanchayath + '","age":"' + this.register.age +
            '","email":"' + this.register.email + '"}'
        };

        fetch('/api/donors/register', options)
          .then(response => {
            if (response.status == 200) {
              this.$router.push({
                name: 'index'
              })
            }
          })
        // .then(response => console.log(response))
        // .catch(err => console.error(err));
      },
      async dataInsert() {
        let serve = this
        this.files = this.$refs.myFiles.files
        let data = new FormData();
        data.append('avatar', this.files[0])
        await axios.post('/api/donors/upload', data, {
          header: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'multipart/form-data'
          },
        })
       .then(res => {
         if(res.status == 200){
           if(res.data.details){
              this.errorMsg.details = res.data.details;
              this.errorMsg.message = res.data.message;
           }
           else{
          this.$router.push({
                name: 'index'
              })
           }
           
         }
       })
      }
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

  .input-file {
    display: block;
  }

</style>
