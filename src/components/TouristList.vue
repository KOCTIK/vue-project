<template>
  <div>
    <div class="container h-25 mb-4">
      <div class="row h-50 my-4">
        <div class="col align-self-end">
          <h2 class>Tourists</h2>
        </div>

        <div class="col-md-2 align-self-center">
          <button
            type="button"
            class="btn btn-outline-primary btn-block rounded-pill"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >new tourist</button>
        </div>
      </div>
      
      <div class="row h-50">
        <div class="col-md align-self-center">
          <input
            v-model="inputSearch"
            id="search-box"
            class="form-control rounded-pill"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="list-group">
        <router-link
          v-for="tourist in tourists"
          :key="tourist.id"
          class="col list-group-item list-group-item-action mb-2"
          :to="`/tourist-details/${tourist.id}`"
        >
          <div class="row align-items-center">
            <div class="col-md-3 text-center">{{tourist.fname}}</div>
            <div class="col-md-3 text-center">{{tourist.lname}}</div>
            <div class="col-md-4 text-center">{{getCountriesMap.get(tourist.country)}}</div>
            <div class="col-md-2">
              <button
                type="button"
                class="btn btn-block rounded-pill btn-outline-danger"
                @click.self.prevent="deleteTourist(tourist)"
              >delete</button>
            </div>
          </div>
        </router-link>
      </div>
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
          <tourist-form />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import TouristForm from "./TouristForm.vue";

export default {
  components: {
    TouristForm
  },

  data() {
    return {
      inputSearch: ""
    };
  },

  computed: {
    ...mapGetters(["getTourists", "getCountriesMap"]),

    tourists: function() {
      return this.getTourists
        .filter(o => {
          return Object.keys(o).some(k => {
            if (k === "fname" || k === "lname") {
              return (
                o[k]
                  .toString()
                  .toLowerCase()
                  .indexOf(this.inputSearch) != -1
              );
            }
          });
        })
        .reverse();
    }
  },

  methods: {
    ...mapActions(["removeTouristAction", "addSelectedTouristAction"]),
    deleteTourist(tourist) {
      this.removeTouristAction(tourist);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.addSelectedTouristAction(Number(to.params.id));
    next();
  }
};
</script>



<style scoped>

</style>
