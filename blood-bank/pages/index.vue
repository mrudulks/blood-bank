<template>
  <div class="container">
    <div class="pt-5 pb-5 text-center">
      <h2>Blood Bank</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mt-5">
            dsd
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data() {
      return {
        items: ''
      }
    },
    async fetch() {
      const data = await fetch('/api/')
      this.items = data.json()
    }
  }

</script>
<style>
  .card {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

</style>
