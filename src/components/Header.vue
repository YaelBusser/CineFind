<template>
  <div class="header">
    <nav>
      <router-link to="/">
        <img src="https://fontmeme.com/permalink/230308/1f21cf983ff5e620f00dbddf24b20df5.png" alt="netflix-font">
      </router-link>
      <div class="nav-text">
        <router-link to="/">
          <p>Accueil</p>
        </router-link>
        <router-link to="/movies">
          <p>Films</p>
        </router-link>
        <router-link to="/series">
          <p>Séries</p>
        </router-link>
      </div>
    </nav>
    <div class="header-right">
      <div class="block-search">
        <input v-model="searchText" @input="searchMovie" placeholder="Recherchez vos films..." class='js-search'
               type="text">
        <i class="fa fa-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    searchMovie() {
      this.$emit('search-movie', this.searchText);
    },
  },
}
</script>

<style scoped>
.block-search {

}

.block-search input[type=text] {
  padding: 15px 40px 15px 20px;
  width: 0;
  color: rgba(255,255,255,0.8)!important;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 2px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  transition: width 0.4s ease;
  outline: none!important;
  z-index: 2;
  color: white;
}

.block-search input[type=text]:focus {
  width: 300px;
  border: 1px solid rgba(255,255,255,0.5);
}

.block-search i {
  position: relative;
  left: -37px;
  color: black;
  z-index: -1;
  color: white;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(20, 20, 20);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-right{
}
nav {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 50px;
}

nav img {
  width: 100px;
}

nav p {
  font-family: CineFindRegular;
  color: white;
  transition: all 0.1s ease-in-out;
  font-size: 15px;
}

nav p:hover {
  color: rgba(255, 255, 255, 0.8);
}

.nav-text {
  display: flex;
  gap: 20px;
}
</style>