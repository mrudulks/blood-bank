<template>
  <div>
    
    <section class="container">
      <div class="row">
        <div class="col-md-3"></div> 
        <div class="col-md-6 d-flex vh-100  align-items-center justify-content-center">
          <div class="login-form card p-5 text-center">
            <h3 class="text-center mb-4">Please Login</h3>
            <p class="text-danger mb-3" v-if="errorMsg">{{errorMsg}}</p>
            <form action @submit.prevent="loginUser" id="loginForm">
              <input type="text" class="form-control" placeholder="Username or Email" v-model="form.username">
              <input type="password" class="form-control" placeholder="Password" v-model="form.password">
              <div class="col-md-12 text-center">
                <button class="btn btn-primary  mb-3" type="submit">Login</button>
              </div>
              <div class="col-md-12 text-center">
                <p class="text-white">New User?</p><nuxt-link to="/register" class="">Register</nuxt-link>
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
    layout: 'custom',
    data() {
      return {
        form: {},
        user:[],
        items:'',
        errorMsg:''
      }
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

        const response = await fetch('/api/user/auth', options)
        if(response.status == 200){
            const data = await response.json()
            this.user = data
            if(this.user.length != 0){
                 this.$router.push({
                name: 'index'
              })
            }
            // else if (this.user)
            else{
                console.log("No user found",this.user)
            }
        }
        else if(response.status == 500){
          this.errorMsg = "Enter a valid Username and Password"
          console.log("invalid user")
        }
        
      }
    }
  }

</script>

<style>
.login-form.card{
  flex-direction: column;
}
  .card {
    /* background:var(--bg3); */
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: .5rem;
  }

  input {
    margin-bottom: 2rem;
  }

</style>
