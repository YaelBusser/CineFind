<template>
  <Header @search-movie="searchMovie">
  </Header>
  <router-view/>
</template>
<script>
import Header from "./components/Header.vue";
import VideoTrailer from "./components/Movies10.vue";

export default {
  components: {
    VideoTrailer,
    Header,
  },
  data(){
    return{

    }
  },
  methods: {
    searchMovie(searchText) {
      this.$router.push({path: '/search', query: {q: searchText}});
    },
  },
}
</script>
<style scoped>
</style>
