<template>
  <div class="block-movieInfos" v-if="this.$route.query.q">
    <div class="overlay-cardMovieInfos" @click="this.$router.replace({path: `${path}`});"></div>
    <div class="card-movieInfos">
      <i class="fa-solid fa-circle-xmark" @click="this.$router.replace({path: `${path}`});"></i>
      <div class="card-top">
        <iframe
            class="videoCardMovie"
            src=""
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        <h2></h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailsById",
  props: {
    path: "",
  },
}
</script>

<style scoped>

</style>