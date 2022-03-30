<template>
  <div>
    <b-header></b-header>
   <h1></h1>
  </div>
</template>
<script>
  import BHeader from '~/components/BHeader.vue'
  import api from '~/lib/js/api'
  import axios from 'axios'
  export default {
    layout: 'custom',
    data() {
      return {
        form: {},
        districts: '',
        localbody: '',
        newD: '',
        items:''
      }
    },
    

    watch: {
      '$route.query': '$fetch'
    },
    methods: {
      apiReturn(){
        return this.$api
      }
    },
    mounted(){
      this.apiReturn();
  },
  computed:{
    propertyComputed(){
      return this.api
    }
  }
  }
</script>
