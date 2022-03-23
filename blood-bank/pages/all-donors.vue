<template>
  <div class="container">
    <div class="pt-5 pb-5 ">
      <h2 class="text-center text-red">Blood Bank</h2>
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

        <div class="col-md-4">
          <div class="card mt-5">
            <div class="p-3 img-users">
              <img src="../lib/images/users.svg" alt="">
            </div>
            <div class="pl-3">
              <!-- <h3 v-for="items in donorsCount" :key="items" class="m-0">{{items.count}}</h3> -->
              <h3 class="m-0">1</h3>
              <p>State</p>
            </div>

          </div>
        </div>

        <div class="col-md-4">
          <div class="card mt-5">
            <div class="p-3 img-users">
              <img src="../lib/images/users.svg" alt="">
            </div>
            <div class="pl-3">
              <!-- <h3 v-for="items in donorsCount" :key="items" class="m-0">{{items.count}}</h3> -->
              <h3 class="m-0">14</h3>
              <p>Districts</p>
            </div>

          </div>
        </div>



        <div class="col-md-12 text-right d-flex justify-content-end">
         
            <span class="mt-4 ml-2"><nuxt-link class="btn btn-secondary d-flex" to="/blood-bank"><img src="../lib/images/search.svg" alt="" class="mr-3"> Search</nuxt-link></span>
            <span class="mt-4 ml-2"><nuxt-link class="btn btn-secondary d-flex" to="/register"><img src="../lib/images/add.svg" alt="" class="mr-3">Add Donor</nuxt-link></span>

        </div>



        <div class="col-md-12">
          <div class="tablecard card mt-4">
            <table class="table">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Name</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Last Donated</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- ----- -->
                <tr v-for="items in donors" :key="items.name">
                  <td>{{ items.name }}</td>
                  <td>{{ items.bloodIcon }}</td>
                  <td>
                    <!-- <input v-if="isEdit" type="date" v-model="items.lastDonated" /> -->
                    <div >{{ items.lastDonated }}</div>
                    </td>
                  <td>{{ items.phone }}</td>
                  <td v-if="items.status == 'Active'"><span class="active">Active</span></td>
                  <td v-else ><span class="inactive">Inactive</span></td>
                </tr>
                <!-- ----- -->
              </tbody>
            </table>
          </div>
        </div>

      </div>




    </div>
  </div>
</template>

<script>
  import api from '~/lib/js/api';
  import {donorsList} from '~/lib/js/model'
  export default {
    name: 'IndexPage',
    data() {
      return {
        items: '',
        donorsCount: '',
        donors: '',
        isEdit:false,
      }
    },
    async fetch() {
      const data = await fetch('/api/')
      this.items = data.json();

      const count = await fetch('/api/donors/count')
      this.donorsCount = await count.json();

      const bloodDonors = await fetch('/api/donors/all')
      const jsonDate = await bloodDonors.json()
    this.donors = donorsList.fromArray(jsonDate)

    },
    methods:{
      updateInput(e){
        this.isEdit = false;
      }
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

  .card img {
    height: 2rem;
    width: 2rem;
  }

  .img-users {
    width: fit-content;
    border-radius: 50%;
    background-color: var(--color5);
  }

  .tablecard.card {
    padding: 0;
    border-radius: .5rem;
    overflow: hidden;
  }

  table th {
    border-top: 0 !important;
    border-bottom: 0 !important;
    background-color: #f9fafb;
    color: rgba(107 114 128);
    font-weight: 300;
  }
.btn img{
  width: 1.5rem;
  height: 1.5rem;
}
</style>
