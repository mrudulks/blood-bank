<template>
  <div class="container">
    <div class="pt-md-1-xs-0 pb-5 ">
      <h2 class="text-center d-none text-red">Blood Bank</h2>
      <div class="row">







        <div class="col-md-12">
          <div class="tablecard card mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- ----- -->
                <tr v-for="items in allUsers" :key="items.allUsers">
                  <td>{{ items.first_name }}</td>
                  <td>{{ items.last_name }}</td>

                  <td>{{ items.email }}</td>

                  <td>
                    <div class="d-flex">
                      <nuxt-link :to="{ path: '/edit-donor', query: { id: items.id }}"><img
                          style="height:1.2rem;width:1.2rem" src="../../../lib/images/edit.svg" alt="" srcset="" class="d-none"></nuxt-link>
                      <div class="ml-2"><img style="height:1.2rem;width:1.2rem" src="../../../lib/images/trash.svg" alt=""
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
        allUsers: '',
        isEdit: false,
      }
    },
    methods: {
      updateInput(e) {
        this.isEdit = false;
      },


      async deleteUser(id) {
        console.log(id)
        var options = {
            method: 'DELETE',
        }
        var data = await fetch('/api/user/users/' + id,options)
        var res = await data.json()

        this.dataFetch()
      },

      async dataFetch() {
        const users = await fetch('/api/user/users')
        this.allUsers = await users.json();
      }
    },
    mounted(){
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
