<template>
  <div class="pt-4">
    <div v-if="getTourist" class="h-100">
      <div class="container h-25 mb-2">
        <div class="row h-50 mb-5">
          <div class="col align-self-end m-1">
            <h2 class="m-0">Tourist details</h2>
          </div>
          <div class="col-md-2 align-self-end px-1 m-1">
            <button
              type="button"
              class="btn rounded-pill btn-outline-secondary btn-block"
              @click="$router.go(-1)"
            >go back</button>
          </div>
          <div class="col-md-2 align-self-end px-1 m-1">
            <button
              v-if="disabled"
              type="button"
              class="btn rounded-pill btn-outline-primary btn-block"
              @click="disableSwitcher()"
            >update</button>
            <button
              v-if="!disabled"
              type="button"
              class="btn rounded-pill btn-outline-primary btn-block"
              @click="save()"
            >save</button>
          </div>
        </div>

        <form class="needs-validation" id="profileForm" ref="form" novalidate="true">
          <fieldset :disabled="disabled">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="fname">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="fname"
                  placeholder="First name"
                  v-model="fname"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="lname">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lname"
                  placeholder="Last name"
                  v-model="lname"
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-3">
                <label for="birhtDate">Date of Birth</label>
                <input type="date" class="form-control" id="birhtDate" v-model="birthDate" required />
              </div>
              <div class="form-group col-md-3">
                <label for="gender">Gender</label>
                <select id="gender" class="form-control" v-model="gender" required>
                  <option disabled>undefined...</option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="country">Country</label>
                <select id="country" class="form-control" v-model="country" required>
                  <option disabled>undefined...</option>
                  <option
                    v-for="country in getCountries"
                    :key="country.code"
                    :value="country.code"
                  >{{country.name}}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="remarks">Remarks</label>
              <textarea
                class="form-control"
                id="remarks"
                placeholder="There is no any remarks"
                v-model="remarks"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="flight-list">Flights:</label>
              <select
                class="form-control"
                id="flight-list"
                @change="addSelectedFlight"
                v-model="flight"
              >
                <option v-for="flight in getFlights" :key="flight.id" :value="flight">
                  Departure: {{flight.departureDateAndTime | date('datetime')}}
                  -----
                  Arrival: {{flight.arrivalDateAndTime | date('datetime')}}
                </option>
              </select>
            </div>
            <ul class="list-group">
              <li
                v-for="flight in flights"
                :key="flight.id"
                class="list-group-item list-group-item-action"
              >
                <div class="row">
                  <div class="col-md">
                    <div class="row">
                      <div class="col text-right">
                        <strong>Departure:</strong>
                      </div>
                      <div class="col text-center">{{flight.departureDateAndTime | date('date')}}</div>
                      <div class="col text-center">{{flight.departureDateAndTime | date('time')}}</div>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="row">
                      <div class="col text-right">
                        <strong>Arrival:</strong>
                      </div>
                      <div class="col text-center">{{flight.arrivalDateAndTime | date('date')}}</div>
                      <div class="col text-center">{{flight.arrivalDateAndTime | date('time')}}</div>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <button
                      v-if="!disabled"
                      @click="!disabled ? removeSelectedFlight(flight.id):''"
                      type="button"
                      class="close"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {},

  data() {
    return {
      disabled: true,
      fname: "",
      lname: "",
      gender: "",
      country: "",
      remarks: "",
      birthDate: "",
      flight: "",
      flights: []
    };
  },

  created: function() {
    this.fname = this.getTourist.fname;
    this.lname = this.getTourist.lname;
    this.gender = this.getTourist.gender;
    this.country = this.getTourist.country;
    this.remarks = this.getTourist.remarks;
    this.birthDate = this.getTourist.birthDate;
    this.flights = this.getTourist.flightList;
  },

  computed: mapGetters(["getTourist", "getCountries", "getFlights"]),

  methods: {
    ...mapActions(["updateTouristAction"]),

    disableSwitcher() {
      this.disabled = !this.disabled;
    },

    addSelectedFlight() {
      const flight = this.flight;
      const flights = this.flights;

      if (!flights.some(el => el.id === flight.id)) {
        this.flights = [flight, ...flights];
      }

      this.flight = "";
    },

    removeSelectedFlight(id) {
      this.flights = this.flights.filter(flight => flight.id !== id);
    },

    save() {
      if (this.$refs.form.checkValidity() === false) {
        this.$refs.form.classList.add("was-validated");
      } else {
        const tourist = {
          id: this.getTourist.id,
          fname: this.fname,
          lname: this.lname,
          gender: this.gender,
          country: this.country,
          remarks: this.remarks,
          birthDate: this.birthDate,
          flightList: this.flights
        };

        this.updateTouristAction(tourist);
        this.disableSwitcher();
      }
    }
  }
};
</script>




<style scoped>
</style>
