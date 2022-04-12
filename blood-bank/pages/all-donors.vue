<template>
  <div class="container">
    <div class="pt-md-1-xs-0 pb-5 ">
      <h2 class="text-center d-none text-red">Blood Bank</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mt-1-xs-2">
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
          <div class="card mt-1-xs-2">
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
          <div class="card mt-1-xs-2">
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



        <div class="col-md-12 text-right justify-content-end d-none">

          <span class="mt-4 ml-2">
            <nuxt-link class="btn primary-btn d-flex" to="/blood-bank"><img src="../lib/images/search.svg" alt=""
                class="mr-3"> Search</nuxt-link>
          </span>
          <span class="mt-4 ml-2">
            <nuxt-link class="btn primary-btn d-flex" to="/register"><img src="../lib/images/add.svg" alt=""
                class="mr-3">Add Donor</nuxt-link>
          </span>

        </div>



        <div class="col-md-12">
          <div class="tablecard card mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- ----- -->
                <tr v-for="items in donors" :key="items.name">
                  <td>{{ items.name }}</td>
                  <td>{{ items.bloodIcon }}</td>

                  <td>{{ items.phone }}</td>

                  <td>
                    <div class="d-flex">
                      <nuxt-link :to="{ path: '/edit-donor', query: { id: items.id }}"><img
                          style="height:1.2rem;width:1.2rem" src="../lib/images/edit.svg" alt="" srcset=""></nuxt-link>
                      <div class="ml-2"><img style="height:1.2rem;width:1.2rem" src="../lib/images/trash.svg" alt=""
                          @click="deleteUser(items.id)"></div>
                    </div>

                  </td>

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
  import {
    donorsList
  } from '~/lib/js/model'
  export default {
    name: 'IndexPage',
    data() {
      return {
        items: '',
        donorsCount: '',
        donors: '',
        isEdit: false,
        oid:''
      }
    },
    methods: {
      updateInput(e) {
        this.isEdit = false;
      },
      async deleteUser(id) {
        console.log(id)
        var data = await fetch('/api/donors/delete/' + id)
        var res = await data.json()

        this.dataFetch()
      },
      async dataFetch() {
        const data = await fetch('/api/')
        this.items = data.json();

        const count = await fetch('/api/donors/count')
        this.donorsCount = await count.json();

        const bloodDonors = await fetch('/api/donors/all/'+this.oid)
        const jsonDate = await bloodDonors.json()
        this.donors = donorsList.fromArray(jsonDate)
      },
      localStorageFetch(){
        const localUser = JSON.parse(localStorage.getItem('user'));
        this.oid = localUser[0].o_id
      }
    },
    mounted(){
      this.localStorageFetch(),
      this.dataFetch()
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

  .btn img {
    width: 1.5rem;
    height: 1.5rem;
  }

</style>
