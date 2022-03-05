<template>
  <div>
    <b-header></b-header>
    <section class="container pt-5">
      <div class="blood__group">
        <input type="radio" name="radio" id="a_positive" class="radio__input" value="1" v-model="form.radio"
          @change="radioButton($event)" />
        <label for="a_positive" class="radiobox">
          <div class="radio__box">
            <span>A+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="a_negative" class="radio__input" value="2" v-model="form.radio"  @change="radioButton($event)" />
        <label for="a_negative" class="radiobox">
          <div class="radio__box">
            <span>A-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="b_positive" class="radio__input" value="3" v-model="form.radio" @change="radioButton($event)"/>
        <label for="b_positive" class="radiobox">
          <div class="radio__box">
            <span>B+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="b_negative" class="radio__input" value="4" v-model="form.radio" @change="radioButton($event)"/>
        <label for="b_negative" class="radiobox">
          <div class="radio__box">
            <span>B-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="o_positive" class="radio__input" value="5" v-model="form.radio" @change="radioButton($event)"/>
        <label for="o_positive" class="radiobox">
          <div class="radio__box">
            <span>O+</span>
          </div>
        </label>
      </div>

      <div class="blood__group">
        <input type="radio" name="radio" id="o_negative" class="radio__input" value="6" v-model="form.radio" @change="radioButton($event)"/>
        <label for="o_negative" class="radiobox">
          <div class="radio__box">
            <span>O-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="ab_positive" class="radio__input" value="7" v-model="form.radio" @change="radioButton($event)"/>
        <label for="ab_positive" class="radiobox">
          <div class="radio__box">
            <span>AB+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="ab_negative" class="radio__input" value="8" v-model="form.radio" @change="radioButton($event)"/>
        <label for="ab_negative" class="radiobox">
          <div class="radio__box">
            <span>AB-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="HH" class="radio__input" value="hh" v-model="form.radio" @change="radioButton($event)"/>
        <label for="HH" class="radiobox">
          <div class="radio__box">
            <span>HH</span>
          </div>
        </label>

        <input type="radio" name="radio" id="any" class="radio__input" value="any" v-model="form.radio" @change="radioButton($event)"/>
        <label for="any" class="radiobox">
          <div class="radio__box">
            <span>Any</span>
          </div>
        </label>
      </div>

      <div>
        <label for="state" class="text-white">State</label>
        <select id="state" class="form-control mb-3" v-model="form.state">
          <option value>Kerala</option>
        </select>

        <label for="district" class="text-white">District</label>
        <select id="district" class="form-control mb-3" v-model="form.district" @change="getLocalBody()">
          <option class="" v-for=" district in  districts" :key="district.id" :value="district.id">
            {{district.districtname}}</option>
        </select>

        <label for="state" class="text-white">Block Panchayaths</label>
        <select name id="state" class="form-control mb-3 text-uppercase" v-model="form.blockPanchayath">
          <option v-for="items in localbody" :key="items.id" :value="items.id">{{ items.name }}</option>
        </select>

        <div class="col-12 text-center d-none">
          <span class="btn btn-search btn-primary" @click="getDonors()">Search</span>
          <!-- <a href="">Search</a> -->
        </div>
      </div>

      <div class="container">
          <h3 v-if="donors.length != 0" class="text-center mb-5 mt-5">Blood Donors</h3>
          <div class="row">
          <div class="col-md-3 mb-5" v-for="donor in donors" :key="donor.id">
            <div class="card p-2 text-center">
                <div class="pro-img">
                    <img src="../lib/images/user-svgrepo-com.svg" alt="" srcset="">
                </div>
                <p class="font-weight-bold text-capitalize"> {{ donor.name }}</p>
                <p>{{ donor.phone }}</p>
            </div>
        </div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
  import BHeader from '~/components/BHeader.vue'
  import api from '~/lib/js/api'
  export default {
    components: {
      BHeader,
    },
    data() {
      return {
        form: {},
        districts: '',
        localbody: '',
        newD: '',
        donors:[],
        items:''
      }
    },
    watch: {
      '$route.query': '$fetch'
    },
    async fetch() {
      const itemsList = await api.getDistrict()
        .then((res) => res.json())
      this.districts = itemsList


      if(this.$route.query != null){
          console.log("Hiii")
         const bloodDonors = await api.getDonors(this.$route.query.blood_group)
         if(bloodDonors.status == 200){
             this.donors = await bloodDonors.json()
         }
      }

        const testing = await fetch('http://localhost:5000/items')
        this.items = await testing.json()


    },
    methods: {
      async getLocalBody() {
        const response = await api.getTaluk(this.form.district)
        if (response.status === 200) {
          this.localbody = await response.json();
        }
      },
      getDonors() {
        this.$router.push({
          name: 'blood-doners',
          query: {
            district: this.form.district,
            bloodgroup: this.form.radio,
            blockpanchayaths: this.form.blockPanchayath
          }
        })
      },
      radioButton(event) {
        var data = event.target.value
        this.$router.push({
          name: 'testing',
          query: {
            blood_group: data
          }
        })
      }
    }
  }

</script>
