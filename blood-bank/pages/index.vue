<template>
  <Tutorial />
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return{
      items:''
    }
  },
  async fetch(){
   const data = await fetch('/api/')
   this.items = data.json()
  }
}
</script>
