<template>
  <div class="root">
    <section id="details" class="mt-4">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 border offset-md-4 py-3 bshadow">
            <h4>Add Event Details</h4>
            <form class="mt-3" @submit.prevent="addEvent">
              <input
                type="text"
                placeholder="Event Title"
                v-model="eventData.title"
                class="form-control mb-2"
              />
              <textarea
                placeholder="Event Description"
                v-model="eventData.description"
                class="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Event Location"
                v-model="eventData.location"
                class="form-control mb-2"
              />
              <a class="w-100 mb-2 btn btn-sm btn-warning" @click="toggleDate">
                Select Date & Time (24hrs)
              </a>
              <VDatePicker
                v-if="datePicker"
                v-model="date"
                mode="dateTime"
                is24hr
              />
              <button
                class="w-100 btn btn-sm btn-dark"
              >
                Submit
              </button>
              <p v-if="!isValidForm && hasSubmitted" class="error">Please provide valid data</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
export default {
  name: "Add Event",
  components: {},

  data() {
    return {
      date: new Date(),
      datePicker: false,
      eventData: {
        id: null,
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        users: [],
      },      
      isValidForm: true,
      hasSubmitted: false,
      hasErr: false
    };
  },

  methods: {
    toggleDate() {
      this.datePicker = !this.datePicker;
      setTimeout(() => {
        const dpickercls = document.getElementsByClassName("vc-container")[0];
        if (dpickercls) {
          dpickercls.style.position = "absolute";
          dpickercls.style.zIndex = "99";
          dpickercls.style.left = "50%";
          dpickercls.style.transform = "translateX(-50%)";
        }
      }, 0);
    },

    addEvent() {
      this.hasSubmitted = true
      //get time
      let dateTime = this.date;
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      // let seconds = dateTime.getSeconds();

      //get date
      let offset = dateTime.getTimezoneOffset();
      dateTime = new Date(dateTime.getTime() - offset * 60 * 1000);
      this.eventData.id = this.$store.state.events.length + 1;
      this.eventData.date = dateTime.toISOString().split("T")[0];
      this.eventData.time =
        hours +
        ":" +
        ((minutes + "").length == 1 ? "0" + minutes : minutes) +
        (hours >= 12 ? "PM" : "AM");

      const errs = []
      //check if valid form data
      Object.keys(this.eventData).forEach((key) => {
        if (
          key == "title" ||
          key == "description" ||
          key == "date" ||
          key == "time" ||
          key == "location"
        ) {
          console.log(key, this.eventData[key])
          if (!this.eventData[key]) {
            errs.push(0)
          }
        }
      });
      if(errs.includes(0)){
        this.isValidForm = false
      }
      else{
        this.isValidForm = true
      }
      console.log('is form valid', this.isValidForm, this.eventData)
      if (this.isValidForm) {
        this.$store.commit("addEvent", this.eventData);

        const err = this.$store.state.error;
        if (!err) {
          toast.success("Event Added Successfully", {
            autoClose: 3000,
          });
          setTimeout(() => {
            this.$router.push({ path: "../" });
          }, 3000);
        } else {
          toast.success(err, {
            autoClose: 3000,
          });
        }
      }
    },

  },
};
</script>


<style scoped>
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.vc-container {
  position: absolute !important;
}
.error{
  color: red;
}

@media (max-width: 767px) {
  .modal > div {
    width: 100%;
  }
}
</style>