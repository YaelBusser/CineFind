<template>
  <div class="block-movieInfos"
       :style="this.$route.query.details || this.$route.query.detailsSerie ? 'opacity: 1; z-index: 999; transform: scale(1)' : 'opacity: 0; z-index: -1; transform: scale(0.1)'">
    <div class="overlay-cardMovieInfos" @click="leaveDetails"></div>
    <div class="card-movieInfos">
      <i class="fa-solid fa-circle-xmark" @click="leaveDetails"></i>
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
              <div class="block-age-time">
                <p class="age-limit" v-if="ageLimit !== '' ">{{ ageLimit }}+</p>
                <p><span v-if="hours > 0">{{ hours }} h</span> <span v-if="time > 0"> {{ time }} min</span></p>
              </div>
            </div>
            <p class="description">{{ details.overview }}</p>
          </div>
          <div class="genres">
            <span class="text-genres">Genres: </span>
            <span v-for="(genre, index) in details.genres">
              {{ genre.name }}<span v-if="index !== details.genres.length-1">, </span>
            </span>
            <div class="streaming">
              <span class="text-genres" v-if="streams.length > 0">Streaming: </span>
              <div class="logos_stream">
                <span v-for="stream in streams">
                  <img class="logo_stream" :src="`https://image.tmdb.org/t/p/w1280/${stream.logo_path}`">
                </span>
              </div>
            </div>
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
      runtime: 0,
      hours: 0,
      time: 0,
      streams: [],
    }
  },
  watch: {
    $route: {
      handler: function () {
        this.getDetailsMovie();
        this.getVideo();
        this.getStreaming();
      },
      immediate: true
    }
  },
  methods: {
    getStreaming() {
      fetch(`https://api.themoviedb.org/3/${this.api}/${this.routeApi}/watch/providers?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            this.streams = data.results;
            this.streams = this.streams["US"].flatrate;
          }).catch(error => {
        console.log(error);
      });
    },
    leaveDetails() {
      const query = Object.assign({}, this.$route.query);
      delete query.details;
      delete query.detailsSerie;
      return this.$router.replace({query});
    },
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
              this.hours = 0;
              this.time = 0;
              this.runtime = this.details.runtime;
              while (this.runtime >= 60) {
                this.runtime -= 60;
                this.hours++;
              }
              this.time = this.runtime;
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
              this.hours = 0;
              this.time = 0;
              this.runtime = this.details.episode_run_time;
              while (this.runtime >= 60) {
                this.runtime -= 60;
                this.hours++;
              }
              this.time = this.runtime[0];
              console.log(this.runtime);
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
.logos_stream{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.streaming {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.logo_stream {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

.block-age-time {
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
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
  font-size: 0.8vw;
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
  color: #181818;
  background-color: white;
  border-radius: 100%;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}

.card-movieInfos i:hover {
  color: black;
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
  transition: all ease-in-out 0.5s;
}
</style>