<template>
  <Header @search-movie="searchMovie">
  </Header>
  <router-view/>
</template>
<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
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
