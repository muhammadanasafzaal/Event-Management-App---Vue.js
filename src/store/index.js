import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    // counter: 0,
    // colorCode: 'blue',
    events: [],
    currentEvent: null,
    error: null
  },
  mutations: {
    storeEvents(state, actionPayload){
      if(actionPayload.length){
        state.error = null
        state.events = []
        state.events = [...actionPayload]
      }
      else{
        state.error = "no events to store"
      }
    },

    selectedEvent(state, actionPayload){
      if(state.events.length){
        state.error = null
        const idx = state.events.findIndex(i => i.id == actionPayload)
        if(idx != -1){
          state.currentEvent = state.events[idx]
        }
        else{
          state.error = "event not found"
        }
      }
      else{
        state.error = "events not found"
      }
    },

    updateEventAttendee(state, actionPayload){
      if(actionPayload){
        state.error = null
        const idx = state.events.findIndex(i => i.id == actionPayload.id)
        //if event exist
        if(idx != -1){
          //if event has attendees
          if(state.events[idx].users.length){
            const checkAttendeeExist = state.events[idx].users.findIndex(u => u.name == (actionPayload.name).toLowerCase())
            //if has attendees and user exist
            if(checkAttendeeExist != -1){
              state.error = "user already exist"
            }
            else{
              const obj = {
                id: state.events[idx].users.length+1,
                name: (actionPayload.name).toLowerCase()
              }
              state.events[idx].users.push(obj) 
            }
          }
          //if event does not have attendees
          else{
            const obj = {
              id: state.events[idx].users.length+1,
              name: actionPayload.name
            }
            state.events[idx].users.push(obj) 
          }
        }
        else{
          // return "Something went wrong"
          state.error = "event not found"
        }
      }
    },

    addEvent(state, actionPayload){
      state.error = null
      if(actionPayload){
        state.events.push(actionPayload)
      }
      else{
        state.error = "Something went wrong. Please try again"
      }
    },

    removeAttendee(state, actionPayload){
      state.error = null
      if(actionPayload){
        const eidx = state.events.findIndex(o => o.id == actionPayload.eventId)
        if(eidx != -1){
          if(state.events[eidx].users.length){
            const uidx = state.events[eidx].users.findIndex(u => u.name == actionPayload.attendeeName)
            if(uidx != -1){
              state.events[eidx].users.splice(uidx, 1)
            }
            else{
              state.error = "You are not registered. Please register yourself first"
            }
          }
          else{
            state.error = "Thiis event does not have any attendees"
          }
        }
      }
    }

  },
  actions: {
  },
  getters:{
    getEvents(state){
      return state.events
    }
  },

  modules: {
  },
  plugins: [createPersistedState()],
})
