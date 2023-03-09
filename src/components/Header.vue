<template>
  <div class="header">
    <nav>
      <router-link to="/">
        <img src="https://fontmeme.com/permalink/230308/1f21cf983ff5e620f00dbddf24b20df5.png" alt="netflix-font">
      </router-link>
      <router-link to="/">
        <p>Accueil</p>
      </router-link>
      <router-link to="/movies">
        <p>Films</p>
      </router-link>
      <p>Séries</p>
      <div class="block-search">
        <input v-model="searchText" @input="searchMovie" placeholder="Recherchez vos films..." class='js-search'
               type="text">
        <i class="fa fa-search"></i>
      </div>
    </nav>
    <slot></slot>
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
  color: #525252;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 2px;
  border: none;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  transition: width 0.4s ease;
  outline: none;
  z-index: 2;
}

.block-search input[type=text]:focus {
  width: 300px;
}

.block-search i {
  position: relative;
  left: -37px;
  color: black;
  z-index: -1;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 1px solid red;
  height: 70px;
  display: flex;
  justify-content: start;
  align-items: center;
}

nav {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 50px;
}

nav img {
  width: 100px;
}

nav p {
  font-family: CineFind;
}
</style>