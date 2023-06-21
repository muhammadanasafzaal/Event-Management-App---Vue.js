<template>
  <header>
    <div class="container-fluid">
      <div class="row bg-custom">
        <div class="col-md-12">
          <nav class="navbar navbar-expand-sm navbar-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img src="./assets/logo.png" class="img-fluid logo" alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavbar"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/add-event"
                      >Add Event</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>

  <div id="body">
    <router-view />
  </div>

  <footer class="mt-4 bg-dark" id="footer">
    <div class="container text-light">
      <div class="row px-md-4 py-md-3">
        <div class="col-12 col-md-4 p-4 text-start">
          <img src="./assets/logo.png" class="img-fluid logo" alt="" />
          <p class="mt-3">
            Eventistry Events is a premier event management company dedicated to
            creating unforgettable experiences.
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 text-start">
          <h5 class="mb-3">Events Categories</h5>
          <ul class="p-0" v-for="(item, index) in categories" :key="index">
            <li>
              <a class="nav-link" href="javascript:void(0)">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-4 p-4 text-start">
          <h5 class="mb-3">Contact Us</h5>
          <ul class="p-0">
            <li>
              <p>
                <a class="nav-link" href="tel:11223311">
                  <font-awesome-icon icon="fa-solid fa-phone" />
                  <span class="ms-1">+120-0000000</span>
                </a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  data() {
    return {
      categories: ["Birthday", "Wedding", "Engagement", "Conference"],
    };
  },

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  watch: {
    currentRouteName: {
      handler(newValue) {
        this.alignFooter();
      },
    },
  },

  methods: {
    alignFooter() {
      setTimeout(() => {
        const vpheight = window.innerHeight;
        const bodyheight = document.body.offsetHeight;
        const footer = document.getElementById("footer");
        if (bodyheight >= vpheight) {
          if (footer) {
            footer.style.position = "relative";
          }
        } else {
          if (footer) {
            footer.style.position = "fixed";
          }
        }
      }, 100);
    },
  },

  mounted() {
    this.alignFooter();
    window.addEventListener("resize", () => {
      const vpheight = window.innerHeight;
      const bodyheight = document.body.offsetHeight;
      const footer = document.getElementById("footer");
      if (bodyheight >= vpheight) {
        if (footer) {
          footer.style.position = "relative";
        }
      } else {
        if (footer) {
          footer.style.position = "fixed";
        }
      }
    });
  },
};
</script>

<style>
#app {
  font-family: serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "circular";
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

ul {
  padding-left: 0 !important;
}

ul li {
  list-style-type: none;
}

html {
  position: relative;
  min-height: 100%;
}


footer {
  bottom: 0;
  height: auto;
  left: 0;
  position: relative;
  width: 100%;
}

.bg-custom {
  background-color: #f3f2f0;
}

.bg-silver {
  background-color: #f3f2f0 !important;
}

.logo {
  width: 160px;
  border-radius: 10px;
}

</style>
