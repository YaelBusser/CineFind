<template>
  <div class="block-movieInfos" v-if="this.$route.query.details || this.$route.query.detailsSerie">
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
        <h2>{{ title }}</h2>
        <div class="block-infos">
          <div class="container-infos">
            <div class="top-infos">
              <p class="date">{{ this.date.substring(0, 4) }}</p>
              <p class="age-limit" v-if="ageLimit !== '' ">{{ ageLimit }}+</p>
            </div>
            <p class="description">{{ details.overview }}</p>
          </div>
          <div class="genres">
            <span class="text-genres">Genres: </span>
            <span v-for="(genre, index) in details.genres">
              {{ genre.name }}<span v-if="index !== details.genres.length-1">, </span>
            </span>
          </div>
          <div class="people">

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
      api: "",
      routeApi: "",
      title: "",
      date: "",
      ageLimit: "",
      i: 0,
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
      if (this.$route.query.details) {
        this.api = `movie`;
        this.routeApi = this.$route.query.details;
      }
      if (this.$route.query.detailsSerie) {
        this.api = `tv`;
        this.routeApi = this.$route.query.detailsSerie;
      }
      fetch(`https://api.themoviedb.org/3/${this.api}/${this.routeApi}?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&append_to_response=release_dates`)
          .then(response => response.json())
          .then(data => {
            this.details = data;
            if (this.api === "movie") {
              this.title = this.details.title;
              this.date = this.details.release_date;
              for (this.i = 0; this.i < this.details.release_dates.results.length - 1; this.i++) {
                if (this.details.release_dates.results[this.i].iso_3166_1 === "FR") {
                  this.ageLimit = this.details.release_dates.results[this.i].release_dates[0].certification;
                }
              }
            } else {
              fetch(`https://api.themoviedb.org/3/tv/${this.routeApi}/content_ratings?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
                  .then(response => response.json())
                  .then(dataTv => {
                    for (this.i = 0; this.i < dataTv.results.length - 1; this.i++) {
                      if (dataTv.results[this.i].iso_3166_1 === "FR") {
                        this.ageLimit = dataTv.results[this.i].rating;
                      }
                    }
                  }).catch(error => {
                console.log(error)
              });
              this.title = this.details.name;
              this.date = this.details.last_air_date;
            }
          }).catch(error => {
        console.log(error);
      });
    },
    async getVideo() {
      if (this.$route.query.details) {
        this.api = `movie`;
        this.routeApi = this.$route.query.details;
      }
      if (this.$route.query.detailsSerie) {
        this.api = `tv`;
        this.routeApi = this.$route.query.detailsSerie;
      }
      fetch(`https://api.themoviedb.org/3/${this.api}/${this.routeApi}/videos?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            this.srcVideo = data.results;
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
        return "https://www.youtube.com/embed/dQw4w9WgXcQ?loop=1&controls=0&autoplay=1&mute=1&vq=hd1080&autohide=1&showinfo=0&modestbranding=1&playlist=dQw4w9WgXcQ";
      }
    },
  },
}
</script>

<style scoped>
.age-limit {
  width: 1.5vw;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.1vw;
  font-size: 0.7vw;
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
}

.top-infos {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.date {
  font-family: CineFindLight;
  margin-block-start: 0;
  margin-block-end: 0;
  color: white;
}

.text-genres {
  margin-block-start: 0;
  margin-block-end: 0;
  color: #777;
  font-family: CineFindLight;
}

.genres {
  width: 20%;
  gap: 5px;
  font-size: 0.8vw;
}


.container-infos {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.block-infos {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.description {
  color: white;
  text-align: justify;
  font-size: 0.8vw;
  font-family: CineFindLight;
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