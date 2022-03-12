<template>
  <div>
    <b-header></b-header>
    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">Register for Blood Donation</h2>
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

        </div>
        <div class="col-md-12">
          <button class="btn btn-primary  mb-3" type="submit">Login</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
  import BHeader from '~/components/BHeader.vue'
  //   import api from '~/lib/js/api'
  export default {
    components: {
      BHeader,
    },
    data() {
      return {
        user: {},
        userResponse: ''
      }
    },
    methods: {
      async userRegister() {
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: '{"first_name":"' + this.user.firstName + '","second_name":"' + this.user.secondName +
            '","email":"' + this.user.email + '","password":"' + this.user.password + '"}'
        };

        const response = await fetch('http://127.0.0.1:5000/admin/users', options)
        if (response.status == 200) {
          const data = await response
          // if(this.user.length != 0){
          //     // console.log(data[0].first_name);
          //      this.$router.push({
          //     name: 'blood-bank'
          //   })
          // }
          // else{
          //     console.log("No user found")
          // }
        }
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
