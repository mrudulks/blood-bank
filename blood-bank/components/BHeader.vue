<template>
  <header class="bg-blueish1">
    <nav class="navbar navbar-expand-lg navbar-light   container">
      <a class="navbar-brand text-red" href="#">Navbar</a>
    </nav>
  </header>

</template>
<script setup>
// const counter = useCookie('counter')
  export default {
    name: 'Header',
    data(){
      return{
        cookieRes :''
      }
    },
    
    // cookie:useCookie('user-session')
  }


</script>
