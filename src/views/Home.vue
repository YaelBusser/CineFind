<template>
  <VideoTrailer />
  <MovieList></MovieList>
</template>
<script>
import Header from "../components/Header.vue";
import MovieList from "./MovieList.vue";
import VideoTrailer from "../components/VideoTrailer.vue";

export default {
  components: {
    VideoTrailer,
    MovieList,
    Header
  },
  data() {
    return {}
  },
}
</script>
<style scoped>
</style>