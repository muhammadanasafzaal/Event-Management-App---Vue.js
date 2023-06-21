<template>
  <section id="carousel">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-0">
          <CarouselSection />
        </div>
      </div>
    </div>
  </section>

  <section id="events" class="mt-4">
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 py-2 bg-dark">
          <h4 class="mb-0 text-light">Active Events</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <ul class="ps-0" v-if="events.length">
            <li class="mb-2" v-for="e in events" :key="e.id" >
              <div class="row events">
                <div class="col col-4 p-3 text-light">
                  <h1 class="date mb-0">{{(e.date).slice(-2)}}</h1>
                  <h4 class="mb-3">{{getMonthName(e.date)}}</h4>
                  <h5>{{e.time}}</h5>
                </div>
                <div class="col col-8 p-3 bg-silver">
                  <h4 class="mb-0">{{e.title}}</h4>
                  <p class="mb-0">{{e.description.length > 30 ? e.description.slice(0, 30 - 1) + "…" : e.description}} </p>
                  <p class="mb-0">{{e.location}}</p>
                  <p >Total Attending: {{e.users.length}}</p>
                  <button class="btn btn-sm btn-dark" @click="viewDetails(e.id)">
                    view details
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <p v-else>No active events</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CarouselSection from "../components/CarouselSection.vue";

export default {
  name: "Home",
  components: {
    CarouselSection,
  },

  data() {
    return {
      events: [],
    };
  },

  methods: {
    viewDetails(eventId){
      this.$store.commit('selectedEvent', eventId)
      this.$router.push({ path: '../details' })  
    },

    getEvents(){
      console.log(this.$store.getters.getEvents, 'all stored events')
      if(this.$store.getters.getEvents.length){
        this.events = [...this.$store.getters.getEvents]

        this.events.sort(function(a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c-d;
        });
      }
    },

    getMonthName(date) {
      const monthNumber = date.slice(4,7)
      const d = new Date();
      d.setMonth(monthNumber - 1);

      return d.toLocaleString('en-US', { month: 'long' });
    }

  },

  mounted(){
    this.getEvents()
  }
};

</script>


<style scoped>

ul li:nth-child(odd) .row .col {
  background-color:#333;
}
ul li:nth-child(even) .row .col {
  background-color:#ea1e63;
}

.date{
  font-size: 4rem;
  font-weight: bold;
}

@media (min-width:992px){
  .events .col{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>