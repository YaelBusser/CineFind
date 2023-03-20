<template>
  <div class="videoTrailer">
    <VideoTrailer>
      <Movies10/>
    </VideoTrailer>
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

export default {
  components: {
    Movies10,
    VideoTrailer,
    MovieList,
    Header,
  },
  data() {
    return {}
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
.block-list{
  margin-top: 150vh;
}
</style>