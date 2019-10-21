import Vue from 'vue';
import Vuex from 'vuex';
import flights from './modules/flights'
import tourists from './modules/tourists'
import countries from './modules/countries'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tourists,
        flights,
        countries
    }    
})