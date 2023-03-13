<template>
  <VideoTrailer>
    <Movies10/>
  </VideoTrailer>
  <MovieList></MovieList>
</template>
<script>
import Header from "../components/Header.vue";
import MovieList from "./MovieList.vue";
import VideoTrailer from "../components/VideoTrailer.vue";
import Movies10 from "../components/Movies10.vue";

export default {
  components: {
    Movies10,
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