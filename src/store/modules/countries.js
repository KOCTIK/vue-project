import { COUNTRIES } from "../../assets/countries"

export default {
    state: {
        countries: COUNTRIES
    },
    getters: {
        getCountries(state) {
            return state.countries
        },

        getCountriesMap(state) {
            const countries = new Map()
            state.countries.forEach(el => countries.set(el.code, el.name))
            return countries
        }
    }
}