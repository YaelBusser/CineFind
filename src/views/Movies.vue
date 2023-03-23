<template>
  <VideoTrailer  @card-movie="cardMovie" />
  <details-by-id :path="path" />
<h1>Movies</h1>
</template>

<script>
import VideoTrailer from "../components/VideoTrailer.vue";
import DetailsById from "../components/detailsById.vue";

export default {
  name: "Movies",
  components: {DetailsById, VideoTrailer},
  data(){
    return{
      path: "/movies",
    }
  },
  mounted() {
    this.$router.replace({path: "/movies"});
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
      console.log(cardId);
    },
    //récupérer toutes les infos du movie grâce au paramètre dans l'url avec "this.$route.query.q"
  },
}
</script>

<style scoped>

</style>