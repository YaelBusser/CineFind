<template>
  <div class="videoTrailer">
    <VideoTrailer @card-movie="cardMovie"/>
    <Movies10 @card-movie-little="cardMovie"/>
    <details-by-id :path="path"/>
  </div>
  <div class="body-home">
    <Series10 @card-serie-little="cardSerie"/>
    <MovieList @card-little="cardMovie"></MovieList>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import MovieList from "./MovieList.vue";
import VideoTrailer from "../components/VideoTrailer.vue";
import Movies10 from "../components/Movies10.vue";
import DetailsById from "../components/detailsById.vue";
import Series10 from "../components/Series10.vue";

export default {
  components: {
    Series10,
    DetailsById,
    Movies10,
    VideoTrailer,
    MovieList,
    Header,
  },
  data() {
    return {
      showBlockMovieInfos: null,
      path: "/",
    }
  },
  mounted() {
    this.$router.replace({path: this.$route.path});
  },
  watch: {
    // watch sur $route pour détecter les changements d'URL
    $route: {
      handler: 'getData', // appelle getData() lorsque $route change
      immediate: true // appelle handler immédiatement au chargement initial
    }
  },
  methods: {
    cardMovie(cardId) {
      this.$router.push({path: this.$route.path, query: {details: cardId}});
    },
    cardSerie(cardId) {
      this.$router.push({path: this.$route.path, query: {detailsSerie: cardId}});
    },
  },
}
</script>
<style scoped>
.videoTrailer {
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
}

.body-home {
  margin-top: 30vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>