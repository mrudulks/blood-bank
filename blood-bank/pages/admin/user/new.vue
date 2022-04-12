<template>
  <div>
   
    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">New User</h2>
      <p class="text-danger text-center" v-if="errorMsg">{{ errorMsg}}</p>
      <form action @submit.prevent="userRegister()" id="registerForm">
        <div class="row register">

          <div class="col-md-6">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" class="form-control" v-model="user.firstName">
          </div>

          <div class="col-md-6">
            <label for="second-name">Second Name</label>
            <input type="text" id="second-name" class="form-control" v-model="user.secondName">
          </div>

          <div class="col-md-6">
            <label for="email">Email</label>
            <input type="text" id="email" class="form-control" v-model="user.email">
          </div>

          <div class="col-md-6">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="user.password">
          </div>

           <div class="col-md-6">
            <label for="organisation">Organization</label>
            <select class="form-control" v-model="user.organisation">
              <option>select organization</option>
              <option v-for="items in organization" :value="items.o_id" :key="items.name">{{items.name}}</option>
            </select>
          </div>

        </div>
        <div class="col-md-12 text-center">
          <button class="btn primary-btn  mb-3" type="submit">Login</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import api from '~/lib/js/api';
 
  //   import api from '~/lib/js/api'
  export default {
    data() {
      return {
        user: {},
        userResponse: '',
        modelValue:'',
        errorMsg:'',
        organization:[]
      }
    },
    methods: {
      async userRegister() {
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: '{"first_name":"' + this.user.firstName + '","last_name":"' + this.user.secondName +
            '","email":"' + this.user.email + '","password":"' + this.user.password + '","o_id":"'+this.user.organisation+'"}'
        };

        const response = await fetch('/api/user', options)
        if(response.status == 403){
          this.errorMsg = "User Already Exists"
        }
      },
      async organizationFetch(){
      const data = await api.getOrganization();
      this.organization = await data.json()
    }
    },
    mounted(){
      this.organizationFetch()
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
