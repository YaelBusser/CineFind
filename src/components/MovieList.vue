<template>
  <div>
    <div v-for="movie in movies">
      {{ movie.title }}
    </div>
  </div>
</template>
<script>
import process from 'process'
export default {
  data() {
    return {
      movies: []
    }
  },
  methods: {
    async movieListPop() {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1`)
          .then(response => response.json())
          .then(data => {
            this.movies = data.results
          }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.movieListPop();
  }
}
</script>
<style scoped>

</style>