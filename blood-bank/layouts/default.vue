<template>
  <div class="" id="main-wrapper">
    <aside class="left-sidebar" id="sideBar">
      <div class="close-btn" id="close-btn">
        <img src="../lib/images/close.svg" alt="" @click="closeNav()">
      </div>
      <div class="left-logo">
        <img src="../lib/images/blood.svg" alt="">
        <h3>Blood Bank</h3>
      </div>
      <ul class="left-navbar">
        <li class="left-navitems">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="left-navitems">
          <nuxt-link to="/all-donors">All Donors</nuxt-link>
        </li>
        <li class="left-navitems">
          <nuxt-link to="/blood-bank">Search</nuxt-link>
        </li>
        <li class="left-navitems">
          <nuxt-link to="/register">Add Donor</nuxt-link>
        </li>
      </ul>
    </aside>
    <div class="main">
      <header class="main-header">
        <p class="text-capitalize font-weight-bold text-capitalize text-secondary mb-0 mr-2" v-for="items in user" :key="items">{{items.first_name +' '+ items.last_name}}</p>
        <img src="../lib/images/menu.svg" alt="" class="menu-icon" @click="open()">
      </header>
      <Nuxt />
    </div>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        user: '',
      }
    },
    methods: {
      async dataFetch() {
        var item = await fetch('/api/user')

        if (item.status == 500) {
          this.$router.push({
            name: 'login'
          })
        }

        if (item.status == 200) {
          this.user = await item.json();
          
        }
      },

      open(){
          var sideBar = document.getElementById("sideBar")
          sideBar.classList.add("open");
          },
      closeNav(){
         var sideBar = document.getElementById("sideBar")
          sideBar.classList.remove("open");
      }
    },

    mounted(){
      this.dataFetch()
    },

    computed:{
      }
    }
  

</script>

<style>
.open{
  width: calc(100% - 2.4rem);
  opacity: 1;
}
</style>
