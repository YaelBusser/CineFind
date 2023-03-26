<template>
  <div class="body-search">
    <div class="block-movie">
      <div v-for="resultMovie in resultsMovie">
        <div class="itemResult" v-if="result !== null">
          <img :src="`https://image.tmdb.org/t/p/w500/${resultMovie.poster_path}`">
        </div>
      </div>
    </div>
    <div class="block-tv">
      <div v-for="resultTv in resultsTv">
        <div class="itemResult" v-if="result !== null">
          <img :src="`https://image.tmdb.org/t/p/w500/${resultTv.poster_path}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      resultsMovie: [],
      resultsTv: [],
      i: 0,
    }
  },
  watch: {
    $route: {
      handler: 'searchResults',
      immediate: true
    }
  },
  methods: {
    redirect() {
      if (this.$route.query.q === null) {
        this.$router.push({path: '/'});
      }
    },
    searchResults() {
      if (this.$route.query.q === "") {
        this.$router.push({path: '/'});
      }
      this.resultsMovie = [];
      this.resultsTv = [];
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&query=${this.$route.query.q}`)
          .then(response => response.json())
          .then(data => {
            for (this.i = 0; this.i < data.results.length; this.i++) {
              if (data.results[this.i].media_type === "movie") {
                this.resultsMovie.push(data.results[this.i]);
              }
              if (data.results[this.i].media_type === "tv") {
                this.resultsTv.push(data.results[this.i]);
              }
            }
          }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.body-search {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  gap: 5vh;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.itemResult {
  width: 20vw;
  height: 25vh;
}

.block-movie {
  width: 100%;
  display: flex;
  gap: 1vw;
}

.block-tv {
  width: 100%;
  display: flex;
  gap: 1vw;
}
</style>