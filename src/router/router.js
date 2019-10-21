import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import TouristList from '../components/TouristList.vue'
import TouristDetails from '../components/TouristDetails.vue'
import FlightList from '../components/FlightList.vue'
import FlightDetails from '../components/FlightDetails'


Vue.use(VueRouter)

const routes = [
  { path: '/home', componemt: HomePage },
  { path: '/tourist-list', component: TouristList },
  { path: '/tourist-details/:id', component: TouristDetails },
  { path: '/flight-list', component: FlightList },
  { path: '/flight-details/:id', component: FlightDetails },
  { path: '*', component: HomePage }
]

export default new VueRouter({
  mode: 'history',
  routes
})