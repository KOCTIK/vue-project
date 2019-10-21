import { TOURISTS } from "../../assets/tourists-list"

export default {
    state: {
        tourists: TOURISTS,
        tourist: {}
    },
    getters: {
        getTourists(state) {
            return state.tourists
        },
        getTourist(state) {
            return state.tourist
        }
    },
    mutations: {
        addSelectedTouristMutation(state, id) {
            state.tourist = state.tourists.filter(tourist => tourist.id === id)[0]
        },
        addTouristMutation(state, tourist) {
            state.tourists = [...state.tourists, tourist]
        },
        updateTouristMutation(state, tourist) {
            const updateIndex = state.tourists.findIndex(item => item.id === tourist.id)
            state.tourists = [
                ...state.tourists.slice(0, updateIndex),
                tourist,
                ...state.tourists.slice(updateIndex + 1)
            ]
        },
        removeTouristMutation(state, tourist) {
            // const updateIndex = state.tourists.findIndex(item => item.id === tourist.id)
            // state.tourists = [
            //     ...state.tourists.slice(0, updateIndex),
            //     ...state.tourists.slice(updateIndex + 1)
            // ]
            state.tourists = state.tourists.filter(el => el.id != tourist.id)
        }

    },
    actions: {
        addSelectedTouristAction({ commit }, id) {
            commit('addSelectedTouristMutation', id)
        },
        addTouristAction({ commit }, tourist) {
            commit('addTouristMutation', tourist)
        },
        updateTouristAction({ commit }, tourist) {
            commit('updateTouristMutation', tourist)
        },
        removeTouristAction({ commit }, tourist) {
            commit('removeTouristMutation', tourist)
        }
    }
}