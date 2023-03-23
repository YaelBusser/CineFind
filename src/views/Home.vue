<template>
  <div class="videoTrailer">
    <VideoTrailer @card-movie="cardMovie">
      <Movies10 @card-movie-little="cardMovie" />
    </VideoTrailer>
    <details-by-id :path="path" />
  </div>
  <div class="block-list">
    <MovieList></MovieList>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import MovieList from "./MovieList.vue";
import VideoTrailer from "../components/VideoTrailer.vue";
import Movies10 from "../components/Movies10.vue";
import DetailsById from "../components/detailsById.vue";

export default {
  components: {
    DetailsById,
    Movies10,
    VideoTrailer,
    MovieList,
    Header,
  },
  data() {
    return {
      showBlockMovieInfos: null,
      path: "/"
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
    //récupérer toutes les infos du movie grâce au paramètre dans l'url avec "this.$route.query.q"
  },
}
</script>
<style scoped>
.videoTrailer {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.block-list {
  margin-top: 150vh;
}
</style>