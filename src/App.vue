<template>
  <h1>CineFind</h1>
  <img src="https://i.ibb.co/2Mxqb8y/Capture-d-cran-2023-02-20-153922.png">
  <p>Recherchez vos films préférés !</p>{{ message }}
  <MovieSearch  />
  <MovieList />
</template>
<script>
import MovieSearch from "./components/MovieSearch.vue";
import MovieList from "./components/MovieList.vue";
export default {
  components: {
    MovieSearch,
    MovieList
  },
  data() {
    return {
      message: "Hello world !",
    }
  },
  methods: {

  },
  mounted() {
    console.log("ok");
  }
}
</script>
<style scoped>
img {
  width: 50px;
  border-radius: 10px 10px 10px 10px;
}
</style>
