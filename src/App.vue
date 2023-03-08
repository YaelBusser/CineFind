<template>
  <Suspense>
    <template #default>
      <MovieList/>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import MovieList from "./components/MovieList.vue";

export default {
  components: {
    MovieList
  }
}
</script>
<style scoped>

</style>
