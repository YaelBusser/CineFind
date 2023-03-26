<template>
  <Header @search-movie="search">
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
  data() {
    return {}
  },
  methods: {
    async search(searchText) {
      await this.$router.push({path: '/search', query: {q: searchText}});
    },
  },
}
</script>
<style scoped>
</style>
