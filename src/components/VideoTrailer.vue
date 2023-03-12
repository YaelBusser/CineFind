<template>
  <iframe
      :src="videoUrl"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  <div class="botiframe"></div>


</template>
<script>
export default {
  name: "VideoTrailer",
  data() {
    return {
      movie: [],
      video: [],
      theMovie: ""
    }
  },
  methods: {
    async moviePopular() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            this.movie = data.results;
            this.theMovie = this.movie[3].id;
            this.videoMoviePopular();
          }).catch(error => {
        console.log(error);
      });
    },
    async videoMoviePopular() {
      fetch(`https://api.themoviedb.org/3/movie/${this.theMovie}/videos?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            this.video = data.results;
          }).catch(error => {
        console.log(error);
      });
    },
  },
  computed: {
    videoUrl() {
      if (this.video.length > 0) {
        const videoKey = this.video[0].key;
        return `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=0&vq=hd1080&loop=1&autohide=1&showinfo=0&modestbranding=1`;
      }
      return "";
    }
  },
  mounted() {
    this.moviePopular();
  },
}
</script>

<style scoped>
iframe {
  border: none;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
  transform: scaleX(1.15);
}

.botiframe {
  margin-top: 100vh;
}
</style>