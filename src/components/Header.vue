<template>
  <div class="header" :class="{ 'scrolled': scrolled }">
    <nav>
      <router-link to="/">
        <img src="https://fontmeme.com/permalink/230308/1f21cf983ff5e620f00dbddf24b20df5.png" alt="netflix-font">
      </router-link>
      <div class="nav-text">
        <router-link to="/">
          <p :class="{'current': $route.path === '/' }">Accueil</p>
        </router-link>
        <router-link to="/series">
          <p :class="{'current': $route.path === '/series' }">Séries</p>
        </router-link>
        <router-link to="/movies">
          <p :class="{'current': $route.path === '/movies' }">Films</p>
        </router-link>
      </div>
    </nav>
    <div class="header-right">
      <div class="block-search">
        <input v-model="searchText" @input="searchMovie" @keyup.enter="searchMovie" placeholder="Recherchez vos films, séries..." class='js-search'
               type="text">
        <i class="fa fa-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
window.setInterval(function () {
  if (this.handleScroll) {
    this.handleScroll();
  }
}, 0);

export default {
  name: "Header",
  data() {
    return {
      searchText: '',
      scrolled: false,
    };
  },
  methods: {
    searchMovie() {
      this.$emit('search-movie', this.searchText);
    },
    handleScroll() {
      if (scrollY !== 0) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.current {
  font-family: CineFindBold;
}

.block-search input[type=text] {
  padding: 0.5vw;
  width: 1.5vw;
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 0.8vw;
  font-weight: 100;
  letter-spacing: 2px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.4s ease;
  outline: none !important;
  z-index: 2;
  color: white;
  opacity: 0;
}
.block-search input[type=text]::placeholder{
  color: rgba(255, 255, 255, 0.5);
}
.block-search input[type=text]:focus {
  width: 17vw;
  height: 3vh;
  margin-right: 0.8vw;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(0,0,0,0.9);
  opacity: 1;
}

.block-search i {
  position: relative;
  color: black;
  z-index: -1;
  color: white;
  font-size: 1vw;
  right: 2.5vw;
  top: 0.3vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0);
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: all 0.5s ease-in-out;
}

.scrolled {
  background-color: rgb(20, 20, 20);
}

.header-right {
}

nav {
  display: flex;
  align-items: center;
  gap: 1vw;
  margin-left: 2vw;
}

nav a {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav img {
  width: 6vw;
}

nav p {
  font-family: CineFindLight;
  color: #f1f1f1;
  transition: all 0.1s ease-in-out;
  font-size: 0.8vw;
}

nav p:hover {
  color: rgba(255, 255, 255, 0.8);
}

.nav-text {
  display: flex;
  gap: 1vw;
}
</style>