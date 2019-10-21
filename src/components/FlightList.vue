<template>
  <div>
    <div class="container h-25 mb-4">
      <div class="row h-50 my-4">
        <div class="col align-self-end">
          <h2 class>Flights</h2>
        </div>

        <div class="col-md-2 align-self-center">
          <button
            type="button "
            class="btn btn-outline-primary btn-block rounded-pill"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >new flight</button>
        </div>
      </div>
      <div class="row h-50">
        <div class="col-md align-self-center">
          <input
            id="search-box"
            v-model="inputSearch"
            class="form-control rounded-pill"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <table class="table table-hover text-center rounded">
        <thead class="thead-light">
          <tr class>
            <th colspan="2" class="h5 font-weight-bold">Departure</th>
            <th colspan="2" class="h5 font-weight-bold">Arrival</th>
            <th rowspan="2" class="h5 align-middle font-weight-bold">Seats</th>
            <th rowspan="2" class="h5 align-middle font-weight-bold">Price</th>
          </tr>
          <tr>
            <th class="h6">date</th>
            <th class="h6">time</th>
            <th class="h6">date</th>
            <th class="h6">time</th>
          </tr>
        </thead>
        <tbody>
          <router-link
            class="position-relative"
            v-for="flight in flights"
            :key="flight.id"
            tag="tr"
            :to="`/flight-details/${flight.id}`"
          >
            <td>
              <div class="position-absolute">
                <button @click.stop="deleteFlight(flight)" type="button" class="close">
                  <span>&times;</span>
                </button>
              </div>
              {{flight.departureDateAndTime | date('date')}}
            </td>
            <td>{{flight.departureDateAndTime | date('time')}}</td>
            <td>{{flight.arrivalDateAndTime | date('date')}}</td>
            <td>{{flight.arrivalDateAndTime | date('time')}}</td>
            <td>{{flight.numberOfSeats}}</td>
            <td>{{flight.ticketPrice }}</td>
          </router-link>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">New flight</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              @submit.prevent="onSubmit"
              id="profileForm"
              ref="form"
              class="needs-validation"
              novalidate="true"
            >
              <div class="form-group row">
                <label for="departure" class="col-sm-4 col-form-label">Departure date and time</label>
                <div class="col-sm-8">
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="departure"
                    v-model="departure"
                    required
                  />
                  <div class="invalid-feedback">Please enter departure date and time</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="arrival" class="col-sm-4 col-form-label">Arrival date and time:</label>
                <div class="col-sm-8">
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="arrival"
                    v-model="arrival"
                    required
                  />
                  <div class="invalid-feedback">Please enter arrivale date and time</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="seats" class="col-sm-4 col-form-label">Number of seats:</label>
                <div class="col-sm-8">
                  <input
                    type="number"
                    class="form-control"
                    id="seats"
                    v-model="seats"
                    min="0"
                    required
                  />
                  <div class="invalid-feedback">Please enter number of seats</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="price" class="col-sm-4 col-form-label">Ticket price:</label>
                <div class="col-sm-8">
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model="price"
                    min="0"
                    step="0.01"
                    required
                  />
                  <div class="invalid-feedback">Please enter price</div>
                </div>
              </div>
            </form>

            <div v-if="alert === 'exist'" class="row">
              <div class="col-sm-8 offset-md-4">
                <div class="alert alert-warning" role="alert">Such flight is already exists!</div>
              </div>
            </div>
            <div v-if="alert === 'created'" class="row">
              <div class="col-sm-8 offset-md-4">
                <div class="alert alert-success" role="alert">Record created successfully</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal"
            >Close</button>
            <button type="submit" class="btn btn-primary" form="profileForm">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      alert: "",
      inputSearch: "",
      departure: "",
      arrival: "",
      seats: "",
      price: ""
    };
  },

  computed: {
    ...mapGetters(["getFlights"]),

    flights: function() {
      return this.getFlights
        .filter(o => {
          return Object.keys(o).some(k => {
            if (k === "departureDateAndTime" || k === "arrivalDateAndTime") {
              return (
                this.$options.filters
                  .date(o[k], "datetime")
                  .toString()
                  .toLowerCase()
                  .indexOf(this.inputSearch) != -1
              );
            }
          });
        })
        .reverse();
    },

    nextIndex: function() {
      const lastFlight = this.getFlights[this.getFlights.length - 1];
      return lastFlight.id + 1;
    }
  },

  methods: {
    ...mapActions([
      "addFlightAction",
      "removeFlightAction",
      "addSelectedFlightAction"
    ]),

    deleteFlight(flight) {
      this.removeFlightAction(flight);
    },

    onSubmit() {
      if (this.$refs.form.checkValidity() === false) {
        this.$refs.form.classList.add("was-validated");
      } else {
        let exist = false;

        this.getFlights.forEach(flight => {
          if (
            flight.departureDateAndTime === Date.parse(this.departure) &&
            flight.arrivalDateAndTime === Date.parse(this.arrival)
          ) {
            this.alert = "exist";
            exist = true;
          }
        });

        if (!exist) {
          const flight = {
            id: this.nextIndex,
            departureDateAndTime: Date.parse(this.departure),
            arrivalDateAndTime: Date.parse(this.arrival),
            numberOfSeats: this.seats,
            listOfTourists: [],
            ticketPrice: this.price
          };

          this.addFlightAction(flight);
          this.alert = "created";
        }
      }
    },

    closeModal() {
      this.departure = "";
      this.arrival = "";
      this.seats = "";
      this.price = "";

      this.alert = "";
      this.$refs.form.classList.remove("was-validated");
    }
  },

  beforeRouteLeave(to, from, next) {
    this.addSelectedFlightAction(Number(to.params.id));
    next();
  }
};
</script>



<style scoped>
</style>
