<template>
  <div class="root">
    <div class="slider-main">
      <h1 class="text-light" v-if="currCaption">{{currCaption}}</h1>
      <h1 v-else class="text-light" >Exceeding Expectations, Every Event</h1>
      <img v-if="currSlide" :src="currSlide" class="img-fluid slide" alt="event showcase" /> 
      <img v-else src="../assets/img1.jpg" class="img-fluid slide" alt="event showcase" /> 
    </div>
  </div>
</template>


<script>
export default {
  name: "CarouselSection",

  data() {
    return {
      slides: [
        {
          id: 1,
          src: "img1.jpg",
          caption: "Exceeding Expectations, Every Event"
        },
        {
          id: 2,
          src: "img2.jpg",
          caption: "Turning Moments into Memories"
        },
        {
          id: 3,
          src: "img3.jpg",
          caption:"Innovative Events. Flawless Execution"
        },
      ],
      currSlide: null,
      currCaption: '',
      count: 0,
    };
  },

  methods: {
    updateSlides() {
      setInterval(() => {
        if (this.count == 3) {
          this.count = 0;
        }
        this.currSlide = require("../assets/" + this.slides[this.count].src);
        this.currCaption = this.slides[this.count].caption
        this.count++;
      }, 3000);
    },
  },

  mounted() {
    this.updateSlides();
  },
};
</script>

<style scoped>
.slide{
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: 80vh;
}
.slider-main{
  position: relative;
}
.slider-main h1{
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 10%;
  transform: translate(-10%, -50%);
  font-family: fantasy;
  font-size: 3.5rem;
}
.slider-main img{
  filter: brightness(50%);
}

@media (max-width:991px){
  .slider-main h1{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
