<template>
  <Nuxt />
</template>
<script>
  export default {
    data() {
      return {
        user: ''
      }
    },
    async fetch() {
      var item = await fetch('/api/user')

      if (item.status == 500) {
        this.$router.push({
          name: 'login'
        })
      }

      if(item.status == 200){
          this.user = await item.json();
      }
    }
  }

</script>
