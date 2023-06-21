<template>
  <div class="root">
    <section id="details" class="mt-4">
      <div class="container">
        <div class="row bg-silver">
          <div class="col-12 py-5">
            <h6>{{ this.currentEvent?.date }}</h6>
            <h1>{{ this.currentEvent?.title }}</h1>
            <h5>{{ this.currentEvent?.location }}</h5>
          </div>
        </div>
        <div class="row mt-4 px-md-5 py-3 bshadow">
          <div class="col-12 col-md-7 text-md-start text-center">
            <h3>Event Overview</h3>
            <p>
              {{ this.currentEvent?.description }}
            </p>
          </div>
          <div class="col-12 col-md-5 d-md-flex align-items-md-center">
            <button class="btn btn-sm btn-dark" @click="openRsvpModal(1)">
              Attending
            </button>
            <button v-if="currentEvent && currentEvent?.users.length" class="btn btn-sm btn-dark ms-2" @click="openRsvpModal(2)">
              Unmark Attending
            </button>
          </div>
        </div>
        <div class="row mt-4 px-md-5 bshadow pt-3">
          <div class="col-12 col-md-6 text-md-start text-center">
            <h2>Users Attending</h2>
            <ul class="mt-3" v-if="currentEvent && currentEvent?.users.length">
              <li v-for="user in currentEvent?.users" :key="user.id">
                {{ user.id }}. {{ user.name }}
              </li>
            </ul>
            <p v-else>No attendees</p>
          </div>
        </div>
      </div>
    </section>

    <teleport to="body">
      <div class="modal" v-if="rsvpModal">
        <div>
          <div class="container header">
            <div class="row pt-2">
              <div class="col-11">
                <h5>{{ attending ? "Register" : "Unregister" }} yourself</h5>
              </div>
              <div class="col-1">
                <h6 class="font-bold cp" @click="rsvpModal = false">x</h6>
              </div>
            </div>
          </div>
          <div class="body">
            <form @submit.prevent="submit">
              <input
                type="text"
                :placeholder="`Enter your name to ${
                  attending ? 'register' : 'unregister'
                }`"
                v-model="attendeeName"
                class="form-control mb-2"
              />
              <button
                :disabled="attendeeName.length < 2"
                class="btn btn-sm btn-dark"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </teleport>

  </div>
</template>

<script>
import CarouselSection from "../components/CarouselSection.vue";
import { toast } from "vue3-toastify";

export default {
  name: "Home",
  components: {
    CarouselSection,
  },

  data() {
    return {
      rsvpModal: false,
      attendeeName: "",
      currentEvent: null,
      toastCount: 0,
      attendeeRemoval: false,
      attending: false,
    };
  },

  watch: {
    attendeeName: {
      handler(newValue) {
        if (!newValue || newValue != this.attendeeToRemove) {
          this.attendeeRemoval = false;
        }
      },
    },
  },

  methods: {
    getEventDetails() {
      this.currentEvent = this.$store.state.currentEvent;
    },

    openRsvpModal(value) {
      this.rsvpModal = true;
      if (value == 1) {
        this.attending = true;
      }
    },

    markRsvp() {
      const obj = {
        id: this.currentEvent?.id,
        name: this.attendeeName,
      };
      this.$store.commit("updateEventAttendee", obj);
      const err = this.$store.state.error;
      if (!err) {
        toast.success("Registered Successfully", {
          autoClose: 2000,
        });
        setTimeout(() => {
          this.$router.push({ path: "../" });
        }, 2000);
        this.rsvpModal = false;
      } else {
        toast.error(err, {
          autoClose: 3000,
        });
      }
    },

    removeAttendee() {
      if (!this.attending) {
        let obj = {
          eventId: this.currentEvent?.id,
          attendeeName: this.attendeeName,
        };
        if (obj) {
          this.$store.commit("removeAttendee", obj);
        }
        const err = this.$store.state.error;
        if (!err) {
          toast.success("Unregistered Successfully", {
            autoClose: 2000,
          });
          setTimeout(() => {
            this.$router.push({ path: "../" });
          }, 2000);
          this.rsvpModal = false;
        } else {
          toast.error(err, {
            autoClose: 3000,
          });
        }
      }
    },

    submit() {
      if (!this.attending) {
        this.removeAttendee();
      } else {
        this.markRsvp();
      }
    },
  },

  mounted() {
    this.getEventDetails();
  },
};
</script>


<style scoped>
ul li {
  list-style-type: none;
}
.root {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #686767ab;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  /* z-index: 999;*/
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
}

.modal .header {
  background-color: #bbbbbbab;
}

.modal div .body {
  padding: 1rem;
}

.bshadow {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.cp {
  cursor: pointer;
}

@media (max-width: 767px) {
  .modal > div {
    width: 100%;
  }
}
</style>