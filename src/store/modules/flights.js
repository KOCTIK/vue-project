import { FLIGHTS } from "../../assets/flights-list";


export default {
    state: {
        flights: FLIGHTS,
        flight:{}
    },
    getters: {
        getFlights(state){
            return state.flights
        },
        getFlight(state){
            return state.flight
        }

    },
    mutations: {
        addSelectedFlightMutation(state, id) {
            state.flight = state.flights.filter(flight => flight.id === id)[0]
        },
        addFlightMutation(state, flight) {
            state.flights = [...state.flights, flight]
        },
        updateFlightMutation(state, flight) {
            const updateIndex = state.flights.findIndex(item => item.id === flight.id)
            state.flights = [
                ...state.flights.slice(0, updateIndex),
                flight,
                ...state.flights.slice(updateIndex + 1)
            ]
        },
        removeTouristMutation(state, flight) {
            state.flights = state.flights.filter(el => el.id != flight.id)
        }

    },
    actions: {
        addSelectedFlightAction({ commit }, id) {
            commit('addSelectedFlightMutation', id)
        },
        addFlightAction({ commit }, flight) {
            commit('addFlightMutation', flight)
        },
        updateFlightAction({ commit }, flight) {
            commit('updateFlightMutation', flight)
        },
        removeFlightAction({ commit }, flight) {
            commit('removeTouristMutation', flight)
        }

    }
}