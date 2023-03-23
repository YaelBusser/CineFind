<template>
  <div class="block-movieInfos" v-if="this.$route.query.details">
    <div class="overlay-cardMovieInfos" @click="this.$router.replace({path: `${path}`});"></div>
    <div class="card-movieInfos">
      <i class="fa-solid fa-circle-xmark" @click="this.$router.replace({path: `${path}`});"></i>
      <div class="card-top">
        <iframe
            class="videoCardMovie"
            :src="videoUrl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        <h2>{{ this.details.title }}</h2>
        <div class="block-infos">
          <div class="container-infos">
            <p class="description">{{ this.details.overview }}</p>
          </div>
          <div class="distrib-genres">
            <h3>Distribution</h3>
            <h3>Genres</h3>
          </div>
        </div>
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
  data() {
    return {
      details: [],
      srcVideo: [],
    }
  },
  watch: {
    $route: {
      handler: function () {
        this.getDetailsMovie();
        this.getVideo();
      },
      immediate: true
    }
  },
  methods: {
    async getDetailsMovie() {
      fetch(`https://api.themoviedb.org/3/movie/${this.$route.query.details}?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            this.details = data;
          }).catch(error => {
        console.log(error);
      });
    },
    async getVideo() {
      fetch(`https://api.themoviedb.org/3/movie/${this.$route.query.details}/videos?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            if (data.results[0]) {
              this.srcVideo = data.results;
            }
            console.log(this.srcVideo);
          }).catch(error => {
        console.log(error);
      });
    },
  },
  computed: {
    videoUrl() {
      if (this.srcVideo.length > 0) {
        const videoKey = this.srcVideo[0].key;
        return `https://www.youtube.com/embed/${videoKey}?loop=1&controls=0&autoplay=1&mute=1&vq=hd1080&autohide=1&showinfo=0&modestbranding=1&playlist=${videoKey}`;
      } else {
        return "";
      }
    },
  },
}
</script>

<style scoped>
.distrib-genres {
  border: 1px solid green;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.distrib-genres h3 {
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 0.8vw;
  color: #777;
  font-family: CineFindLight;
}

.container-infos {
  border: 1px solid blue;
  width: 60%;
}

.block-infos {
  border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.description {
  color: white;
  text-align: justify;
  font-size: 0.8vw;
  font-family: CineFindRegular;
  margin-block-start: 0;
  margin-block-end: 0;
}

.card-top {
  position: relative;
}

.card-top h2 {
  position: absolute;
  color: white;
  font-size: 2vw;
  top: 25vh;
  left: 2vw;
}

.overlay-cardMovieInfos {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
}

.videoCardMovie {
  border: none;
  transform: scale(1.16);
  clip-path: inset(3.1vw 3.5vw);
  width: 100%;
  height: 50vh;
  margin-top: -1.6vw;
  pointer-events: none;
  z-index: 0;
}

.card-movieInfos {
  width: 50vw;
  height: 95vh;
  background-color: #181818;
  z-index: 101;
  border-radius: 10px 10px 10px 10px;
  position: relative;
  overflow: hidden;
}

.card-movieInfos i {
  position: absolute;
  right: 1vw;
  top: 1vw;
  z-index: 102;
  font-size: 1.8vw;
  width: 1.8vw;
  height: 1.7vw;
  color: white;
  background-color: #181818;
  border-radius: 100%;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}

.card-movieInfos i:hover {
  color: rgba(255, 255, 255, 0.6);
}

.block-movieInfos {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>