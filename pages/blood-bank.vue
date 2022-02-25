<template>
  <div class="container">
    <header class="p-2">
      <h3 class="text-center text-white">Search Blood</h3>
    </header>
    <section>
      <div class="blood__group">
        <input type="radio" name="radio" id="a_positive" class="radio__input" value="1" v-model="form.radio" checked />
        <label for="a_positive" class="radiobox">
          <div class="radio__box">
            <span>A+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="a_negative" class="radio__input" value="2" v-model="form.radio" />
        <label for="a_negative" class="radiobox">
          <div class="radio__box">
            <span>A-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="b_positive" class="radio__input" value="3" v-model="form.radio" />
        <label for="b_positive" class="radiobox">
          <div class="radio__box">
            <span>B+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="b_negative" class="radio__input" value="4" v-model="form.radio" />
        <label for="b_negative" class="radiobox">
          <div class="radio__box">
            <span>B-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="o_positive" class="radio__input" value="5" v-model="form.radio" />
        <label for="o_positive" class="radiobox">
          <div class="radio__box">
            <span>O+</span>
          </div>
        </label>
      </div>

      <div class="blood__group">
        <input type="radio" name="radio" id="o_negative" class="radio__input" value="6" v-model="form.radio" />
        <label for="o_negative" class="radiobox">
          <div class="radio__box">
            <span>O-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="ab_positive" class="radio__input" value="7" v-model="form.radio" />
        <label for="ab_positive" class="radiobox">
          <div class="radio__box">
            <span>AB+</span>
          </div>
        </label>

        <input type="radio" name="radio" id="ab_negative" class="radio__input" value="8" v-model="form.radio" />
        <label for="ab_negative" class="radiobox">
          <div class="radio__box">
            <span>AB-</span>
          </div>
        </label>

        <input type="radio" name="radio" id="HH" class="radio__input" value="hh" v-model="form.radio" />
        <label for="HH" class="radiobox">
          <div class="radio__box">
            <span>HH</span>
          </div>
        </label>

        <input type="radio" name="radio" id="any" class="radio__input" value="any" v-model="form.radio" />
        <label for="any" class="radiobox">
          <div class="radio__box">
            <span>Any</span>
          </div>
        </label>
      </div>

      <div >
        <label for="state" class="text-white">State</label>
        <select id="state" class="form-control mb-3" v-model="form.state">
          <option value>Kerala</option>
        </select>

        <label for="district" class="text-white">District</label>
        <select  id="district" class="form-control mb-3" v-model="form.state">
          <option value>Kerala</option>
        </select>

        <label for="state" class="text-white">State</label>
        <select name id="state" class="form-control mb-3" v-model="form.state">
          <option value>Kerala</option>
        </select>
      </div>

    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {}
      }
    },
    async fetch(){
        
    }
  }

</script>
