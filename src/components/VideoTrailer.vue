<template>
  <div class="block-video">
    <iframe
        :src="videoUrl"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
  </div>
  <div class="bg-overlay">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VideoTrailer",
  data() {
    return {
      movie: [],
      video: [],
      theMovie: "",
      random: Math.floor(Math.random() * 10),
    }
  },
  methods: {
    async moviePopular() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            this.movie = data.results;
            this.theMovie = this.movie[this.random].id;
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
        return `https://www.youtube.com/embed/${videoKey}?loop=1&controls=0&autoplay=1&mute=1&vq=hd1080&autohide=1&showinfo=0&modestbranding=1&playlist=${videoKey}`;
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
  margin-top: -7px;
  clip-path: inset(120px 0);
  border: none;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
  transform: scale(1.33);
  object-fit: cover;
  background: linear-gradient(77deg, rgba(0, 0, 0, .6), transparent 85%);

}

.block-video {
  width: 100%;
  height: 100vh;
}

.bg-overlay {
  position: absolute;
  width: 100%;
  height: 350px;
  left: 0;
  right: 0;
  bottom: 0px;
  z-index: 0;
  background: linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, #141414 90%, #141414);
}

.botiframe {
  margin-top: 100vh;
}
</style>