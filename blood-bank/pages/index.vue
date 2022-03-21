<template>
  <div class="container">
    <div class="pt-5 pb-5 ">
      <h2 class="text-center">Blood Bank</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mt-5">
            <div class="p-3 img-users">
              <img src="../lib/images/users.svg" alt="">
            </div>
            <div class="pl-3">
              <h3 v-for="items in donorsCount" :key="items" class="m-0">{{items.count}}</h3>
              <p>Blood Donors</p>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from '~/lib/js/api';
  export default {
    name: 'IndexPage',
    data() {
      return {
        items: '',
        donorsCount:''
      }
    },
    async fetch() {
      const data = await fetch('/api/')
      this.items = data.json();

      const count = await fetch('/api/donors/count')
      this.donorsCount = await count.json()
    }
  }

</script>
<style>
  .card {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 1.5rem 1.3rem;
    border-radius: 0.375rem;
    flex-direction: row;
    align-items: center;
  }
  .card img{
    height: 2rem;
    width: 2rem;
  }
  .img-users{
    width: fit-content;
    border-radius: 50%;
    background-color: var(--color5);
  }

</style>
