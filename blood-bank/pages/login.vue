<template>
  <div>
    <b-header></b-header>
    <section class="container pt-5">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 d-flex justify-center align-center justify-content-center">
          <div class="login-form card p-5 text-center">
            <h3 class="text-center mb-4">Please Login</h3>
            <form action @submit.prevent="loginUser" id="loginForm">
              <input type="text" class="form-control" placeholder="Username or Email" v-model="form.username">
              <input type="password" class="form-control" placeholder="Password" v-model="form.password">
              <div class="col-md-12 text-center">
                <button class="btn btn-primary  mb-3" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {},
        user:[],
        items:''
      }
    },
    async fetch(){
     
    },
    methods: {
      async loginUser() {
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: '{"email":"'+this.form.username+'","password":"'+this.form.password+'"}'
        };

        const response = await fetch('http://127.0.0.1:5000/auth', options)
        if(response.status == 200){
            const data = await response.json()
            this.user = data
            if(this.user.length != 0){
              localStorage.setItem("user",this.user)
              // console.log(data);
                 this.$router.push({
                name: 'blood-bank'
              })
            }
            else{
                console.log("No user found")
            }
        }
        
      }
    }
  }

</script>

<style>
  .card {
    background:var(--bg3);
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
  }

  input {
    margin-bottom: 2rem;
  }

</style>
