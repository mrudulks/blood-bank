<template>
  <header class="bg-blueish1">
    <nav class="navbar navbar-expand-lg navbar-light   container d-flex justify-content-between text-capitalize">
      <a class="navbar-brand text-red" href="#">Navbar</a>
      <p class="text-white">{{token[0].first_name}}</p>
    </nav>
  </header>

</template>
<script setup>
// const counter = useCookie('counter')
  export default {
    name: 'Header',
    data(){
      return{
        cookieRes :'',
        user:''
      }
    },
    computed:{
      token(){
        if(localStorage.user){
          this.user = localStorage.user
          return JSON.parse(localStorage.user)|| 0
        }
        
      }
    }
    
    // cookie:useCookie('user-session')
  }


</script>
