<template>
  <div>
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">New tourist</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        @click="closeModale"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form
        class="needs-validation"
        @submit.prevent="onSubmit"
        id="profileForm"
        ref="form"
        novalidate="true"
      >
        <div class="form-group row">
          <label for="first-name" class="col-sm-3 col-form-label">First name:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="first-name" v-model="fname" required />
            <div class="invalid-feedback">Please enter first name</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="last-name" class="col-sm-3 col-form-label">Last name:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="last-name" v-model="lname" required />
            <div class="invalid-feedback">Please enter last name</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="gender" class="col-sm-3 col-form-label">Gender:</label>
          <div class="col-sm-9">
            <select id="gender" class="form-control custom-select" v-model="gender" required>
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </select>
            <div class="invalid-feedback">Please select gender</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="country" class="col-sm-3 col-form-label">Country:</label>
          <div class="col-sm-9">
            <select id="Country" class="form-control custom-select" v-model="country" required>
              <option
                v-for="(country, index) in getCountries"
                :key="index"
                :value="country.code"
              >{{country.name}}</option>
            </select>
            <div class="invalid-feedback">Please select gender</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="remarks" class="col-sm-3 col-form-label">Remarks:</label>
          <div class="col-sm-9">
            <textarea class="form-control" id="remarks" v-model="remarks"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="birth-date" class="col-sm-3 col-form-label">Date of birth:</label>
          <div class="col-sm-9">
            <input type="date" class="form-control" id="birth-date" v-model="birthDate" required />
            <div class="invalid-feedback">Please enter date of birht</div>
          </div>
        </div>
      </form>
      <div v-if="alert === 'exist'" class="row">
        <div class="col-sm-9 offset-md-3">
          <div class="alert alert-warning" role="alert">Such tourist is already exists!</div>
        </div>
      </div>
      <div v-if="alert === 'created'" class="row">
        <div class="col-sm-9 offset-md-3">
          <div class="alert alert-success" role="alert">Record created successfully</div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
        @click="closeModale"
      >Close</button>
      <button type="submit" class="btn btn-primary" form="profileForm">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      alert: "",
      fname: "",
      lname: "",
      gender: "",
      country: "",
      remarks: "",
      birthDate: ""
    };
  },

  computed: {
    ...mapGetters(["getCountries", "getTourists"]),
    nextIndex: function() {
      const lastTourist = this.getTourists[this.getTourists.length - 1];
      return lastTourist.id + 1;
    }
  },
  methods: {
    ...mapActions(["addTouristAction"]),

    onSubmit() {

      if (this.$refs.form.checkValidity() === false) {
        this.$refs.form.classList.add("was-validated");
      } else {

        let exist = false;

        this.getTourists.forEach(tourist => {
          if (tourist.fname === this.fname && tourist.lname === this.lname) {
            this.alert = "exist";
            exist = true;
          }
        });

        if (!exist) {
          const tourist = {
            id: this.nextIndex,
            fname: this.fname,
            lname: this.lname,
            gender: this.gender,
            country: this.country,
            remarks: this.remarks,
            birthDate: this.birthDate,
            flightList: []
          };

          this.addTouristAction(tourist);
          this.alert = "created";
        }
      }
    },

    closeModale() {
      this.fname = "";
      this.lname = "";
      this.gender = "";
      this.country = "";
      this.remarks = "";
      this.birthDate = "";

      this.alert = "";
      this.$refs.form.classList.remove("was-validated");
    }
  }
};
</script>


<style scoped>
</style>