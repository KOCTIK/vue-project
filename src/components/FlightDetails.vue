<template>
  <div class="pt-4">
    <div v-if="getFlight" class="h-100">
      <div class="container h-25 mb-2">
        <div class="row h-50 mb-5">
          <div class="col align-self-end m-1">
            <h2 class="m-0">Flight details</h2>
          </div>
          <div class="col-md-2 align-self-end px-1 m-1">
            <button
              type="button"
              class="btn rounded-pill btn-outline-secondary btn-block"
              @click="$router.go(-1)"
            >
              go
              back
            </button>
          </div>
          <div class="col-md-2 align-self-end px-1 m-1">
            <button
              type="button"
              class="btn rounded-pill btn-outline-primary btn-block"
              @click="disabled?disableSwitcher():save()"
            >{{disabled?"update":"save"}}</button>

            <!-- <button
              v-if="disabled"
              type="button"
              class="btn rounded-pill btn-outline-primary btn-block"
              @click="disableSwitcher"
            >update</button>
            <button
              v-if="!disabled"
              type="button"
              class="btn rounded-pill btn-outline-primary btn-block"
              @click="save"
            >save</button>-->
            
          </div>
        </div>

        <form class="needs-validation" ref="form" novalidate="true">
          <fieldset :disabled="disabled">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="departure">Departure date and time:</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  id="departure"
                  v-model="departure"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="arrival">Arrival date and time:</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  id="arrival"
                  v-model="arrival"
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="seats">Number of seats:</label>
                <input
                  type="number"
                  class="form-control"
                  id="seats"
                  min="0"
                  v-model="seats"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">Ticket price:</label>
                <input
                  type="number"
                  id="price"
                  class="form-control"
                  min="0"
                  step="0.01"
                  v-model="price"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="tourist-list">List of tourists:</label>
              <select
                class="form-control"
                id="tourist-list"
                @change="addSelectedTourist"
                v-model="tourist"
              >
                <option
                  v-for="tourist in getTourists"
                  :key="tourist.id"
                  :value="tourist"
                >{{tourist.fname + " " + tourist.lname}}</option>
              </select>
            </div>

            <ul class="list-group">
              <li
                v-for="tourist in tourists"
                :key="tourist.id"
                class="list-group-item list-group-item-action"
              >
                <div class="row">
                  <div class="col-md">
                    <div class="row">
                      <div class="col text-right">
                        <strong>First name:</strong>
                      </div>
                      <div class="col text-center">{{tourist.fname}}</div>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="row">
                      <div class="col text-right">
                        <strong>Last name:</strong>
                      </div>
                      <div class="col text-center">{{tourist.lname}}</div>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="row">
                      <div class="col text-right">
                        <strong>Country:</strong>
                      </div>
                      <div class="col text-center">{{getCountriesMap.get(tourist.country)}}</div>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <button
                      v-if="!disabled"
                      @click="!disabled ? removeSelectedTourist(tourist.id):''"
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
  data() {
    return {
      disabled: true,
      departure: "",
      arrival: "",
      seats: "",
      price: "",
      tourist: "",
      tourists: []
    };
  },

  created: function() {
    this.departure = this.formatDate(this.getFlight.departureDateAndTime);
    this.arrival = this.formatDate(this.getFlight.arrivalDateAndTime);
    this.seats = this.getFlight.numberOfSeats;
    this.price = this.getFlight.ticketPrice;
    this.tourists = this.getFlight.listOfTourists;
  },

  computed: mapGetters(["getFlight", "getTourists", "getCountriesMap"]),

  methods: {
    ...mapActions(["updateFlightAction"]),

    disableSwitcher() {
      this.disabled = !this.disabled;
    },

    addSelectedTourist() {
      const tourist = this.tourist;
      const tourists = this.tourists;

      if (!tourists.some(el => el.id === tourist.id)) {
        this.tourists = [tourist, ...tourists];
      }

      this.tourist = "";
    },

    removeSelectedTourist(id) {
      this.tourists = this.tourists.filter(tourist => tourist.id !== id);
    },

    save() {
      if (this.$refs.form.checkValidity() === false) {
        this.$refs.form.classList.add("was-validated");
      } else {
        
          const flight = {
            id: this.getFlight.id,
            departureDateAndTime: Date.parse(this.departure),
            arrivalDateAndTime: Date.parse(this.arrival),
            numberOfSeats: this.seats,
            ticketPrice: this.price,
            listOfTourists: this.tourists
          };

          this.updateFlightAction(flight);
          this.disableSwitcher();
          this.$refs.form.classList.remove("was-validated");
        }
      
    },

    formatDate(date) {
      const d = new Date(Number(date));
      const year = d.getFullYear();
      const month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      const minutes =
        d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

      const formatedDate =
        [year, month, day].join("-") + "T" + [hours, minutes].join(":");

      return formatedDate;
    }
  }
};
</script>


<style scoped>
</style>
