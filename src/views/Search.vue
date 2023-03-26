<template>
  <details-by-id :path="path" />
  <div class="body-search">
    <div class="block-movie">
      <h2>Films</h2>
      <div class="movies">
        <div v-for="(resultMovie, index) in resultsMovie" class="block-item">
          <div class="itemResult" v-if="result !== null">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultMovie.poster_path}`" @mouseover="toggleCard(); hoverId = index">
          </div>
          <div class="card" :style="showCard === true && hoverId === index ? 'opacity: 1; z-index: 2' : 'opacity: 0; z-index: -1' " @mouseleave="showCard = false">
            <div class="block-btn" @click="showInfos; idCard = resultsMovie.id">
              <i class="fa-solid fa-circle-info"></i>
              <p>Plus d'infos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block-tv">
      <h2>Séries</h2>
      <div class="tv">
        <div v-for="resultTv in resultsTv">
          <div class="itemResult" v-if="result !== null">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultTv.poster_path}`">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsById from "../components/detailsById.vue";

export default {
  name: "Search",
  components: {DetailsById},
  data() {
    return {
      resultsMovie: [],
      resultsTv: [],
      i: 0,
      hoverId: 0,
      showCard: false,
      idCard: 0,
      path: "/search",
    }
  },
  watch: {
    $route: {
      handler: 'searchResults',
      immediate: true
    }
  },
  methods: {
    cardMovie() {
      this.$router.push({path: this.$route.path, query: {details: this.idCard}});
    },
    cardSerie() {
      this.$router.push({path: this.$route.path, query: {detailsSerie: this.idCard}});
    },
    showInfos() {
      this.$emit('card-infos-little', this.idCard);
    },
    toggleCard(){
      this.showCard = true;
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
.card{
  width: 24vw;
  height: 45vh;
  position: absolute;
  top: -6vw;
  left: -5vw;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  z-index: -1;
  transition: all ease-in-out 0.3s;
}
.body-search {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  margin-left: 5vw;
}
h2{
  font-size: 1.5vw;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3vw;
  z-index: 1;
}

.itemResult {
  width: 15vw;
  height: 20vh;
}

.block-tv, .block-movie {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}
.movies, .tv{
  display: flex;
  gap: 0.5vw;
}
.block-item{
  position: relative;
}
</style>