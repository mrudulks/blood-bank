<template>
  <div>
   
    <section class="container pt-5">
      <h2 class="mb-3 mt-5 text-center">Add new Organization</h2>
      <p class="text-danger text-center" v-if="errorMsg">{{ errorMsg}}</p>
      <form action @submit.prevent="newOrganization()" id="registerForm">
        <div class="row register">

          <div class="col-md-6">
            <label for="first-name">Organization Name</label>
            <input type="text" id="first-name" class="form-control" v-model="organization">
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
        organization:''
      }
    },
    methods: {
      async newOrganization() {
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: '{"name":"' + this.organization + '"}'
        };

        const response = await fetch('/api/organization', options)
        if(response.status == 403){
          this.errorMsg = "User Already Exists"
        }
      },
      async organizationFetch(){
      const data = await api.getOrganization();
      this.organizations = await data.json()
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
