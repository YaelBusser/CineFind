<template>
  <details-by-id :path="path"/>
  <div class="body-search">
    <div class="block-movie">
      <h2>Films</h2>
      <div class="movies">
        <div v-for="(resultMovie, index) in resultsMovie" class="block-item">
          <div class="itemResult"
               :style="index >= 12 && !showMore ? 'position: absolute; opacity: 1; top: -100vh' : 'position: relative; opacity: 1;'">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultMovie.poster_path}`"
                 @click="showInfosMovie(resultMovie.id);"
                 @mouseover="toggleCard(); infoCard('movie', resultMovie.id); infoDetails('movie', resultMovie.id); hoverId = index; isOver = true;"
                 v-if="index < 12"
                 @mouseleave="isOver = false;">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultMovie.poster_path}`"
                 @click="showInfosMovie(resultMovie.id);"
                 @mouseover="toggleCard(); infoCard('movie', resultMovie.id); hoverId = index; isOver = true;"
                 v-if="index >= 12"
                 @mouseleave="isOver = false;" :class="showMore ? 'moreOn' : 'moreOff'">
          </div>
          <div class="card"
               :style="showCard === true && hoverId === index ? 'opacity: 1; z-index: 100; transform: scale(1);' : 'opacity: 0; z-index: -1; transform: scale(0)' "
               @mouseleave="showCard = false">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultMovie.poster_path}`"
                 @click="showInfosMovie(resultMovie.id);">
            <div class="description">
              <p class="age-limit" v-if="ageLimitMovie">{{ ageLimitMovie }}+</p>
              <p><span v-if="hours > 0">{{ hours }} h</span> <span v-if="time > 0">{{ time }} min</span></p>
            </div>
            <div class="container-block-btn">
              <div class="block-btn" @click="showInfosMovie(resultMovie.id); idCard = resultsMovie.id">
                <i class="fa-solid fa-circle-info"></i>
                <p>Plus d'infos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnMore" v-if="resultsMovie.length > 12">
        <p @click="toggleMoreShow" v-if="showMore === false"><i class="fa-solid fa-plus"></i></p>
        <p @click="toggleMoreHide" v-if="showMore"><i class="fa-solid fa-minus"></i></p>
      </div>
    </div>
    <div class="block-tv">
      <h2>Séries</h2>
      <div class="tv">
        <div v-for="(resultTv, index) in resultsTv" class="block-item">
          <div class="itemResult"
               :style="index >= 12 && !showMoreTv ? 'position: absolute; opacity: 0;' : 'position: relative; opacity: 1;'">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultTv.poster_path}`" @click="showInfosSerie(resultTv.id);"
                 @mouseover="toggleCardTv(); infoCard('tv', resultTv.id); hoverIdTv = index; isOverTv = true;"
                 v-if="index < 12"
                 @mouseleave="isOverTv = false;">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultTv.poster_path}`" @click="showInfosSerie(resultTv.id);"
                 @mouseover="toggleCardTv(); infoCard('tv', resultTv.id); hoverIdTv = index; isOverTv = true;"
                 v-if="index >= 12"
                 @mouseleave="isOverTv = false;" :class="showMoreTv ? 'moreOn' : 'moreOff'">
          </div>
          <div class="cardTv"
               :style="showCardTv === true && hoverIdTv === index ? 'opacity: 1; z-index: 100; transform: scale(1);' : 'opacity: 0; z-index: -1; transform: scale(0)' "
               @mouseleave="showCardTv = false">
            <img :src="`https://image.tmdb.org/t/p/w500/${resultTv.poster_path}`" @click="showInfosSerie(resultTv.id);">
            <div class="description">
              <p class="age-limit" v-if="ageLimitSerie">{{ ageLimitSerie }}+</p>
              <p><span v-if="hours > 0">{{ hours }} h</span> <span v-if="time > 0">{{ time }} min</span></p>
            </div>
            <div class="container-block-btn">
              <div class="block-btn" @click="showInfosSerie(resultTv.id); idCard = resultsMovie.id">
                <i class="fa-solid fa-circle-info"></i>
                <p>Plus d'infos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnMore" v-if="resultsTv.length > 12">
        <p @click="toggleMoreTvShow" v-if="showMoreTv === false"><i class="fa-solid fa-plus"></i></p>
        <p @click="toggleMoreTvHide" v-if="showMoreTv"><i class="fa-solid fa-minus"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsById from "../components/detailsById.vue";
import * as process from "process";

export default {
  name: "Search",
  components: {DetailsById},
  data() {
    return {
      runtime: 0,
      hours: 0,
      time: 0,
      ageLimitMovie: "",
      ageLimitSerie: "",
      resultsMovie: [],
      resultsTv: [],
      i: 0,
      hoverId: 0,
      hoverIdTv: 0,
      showCard: false,
      showCardTv: false,
      idCard: 0,
      path: "/search",
      showMore: false,
      showMoreTv: false,
      isOver: false,
      isOverTv: false,
      infoMovie: [],
      infoTv: [],
    }
  },
  watch: {
    $route: {
      handler: 'searchResults',
      immediate: true
    }
  },
  methods: {
    toggleMoreShow() {
      this.showMore = true;
    },
    toggleMoreHide() {
      this.showMore = false;
    },
    toggleMoreTvShow() {
      this.showMoreTv = true;
    },
    toggleMoreTvHide() {
      this.showMoreTv = false;
    },
    cardMovie() {
      this.$router.push({path: this.$route.path, query: {details: this.idCard}});
    },
    cardSerie() {
      this.$router.push({path: this.$route.path, query: {detailsSerie: this.idCard}});
    },
    showInfosMovie(id) {
      this.$router.push({path: this.$route.path, query: {q: this.$route.query.q, details: id}});
    },
    showInfosSerie(id) {
      this.$router.push({path: this.$route.path, query: {q: this.$route.query.q, detailsSerie: id}});
    },
    toggleCard() {
      setTimeout(() => {
        if (this.isOver) {
          this.showCard = true;
        }
      }, 500);
    },
    infoCard(type, id) {
      fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&append_to_response=release_dates`)
          .then(response => response.json())
          .then(data => {
            this.infoTv = data;
            if (type === "tv") {
              this.hours = 0;
              this.time = 0;
              this.runtime = this.infoTv.episode_run_time;
              while (this.runtime >= 60) {
                this.runtime -= 60;
                this.hours += 1;
              }
              this.time = this.runtime[0];
              this.ageLimitSerie = 0;
              fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
                  .then(response => response.json())
                  .then(dataTv => {
                    for (this.i = 0; this.i < dataTv.results.length - 1; this.i++) {
                      if (dataTv.results[this.i].iso_3166_1 === "FR") {
                        this.ageLimitSerie = dataTv.results[this.i].rating;
                      }
                    }
                  }).catch(error => {
                console.log(error)
              });
            } else {
              this.infoMovie = data;
              this.hours = 0;
              this.time = 0;
              this.runtime = this.infoMovie.runtime;
              while (this.runtime >= 60) {
                this.runtime -= 60;
                this.hours += 1;
              }
              this.time = this.runtime;
            }
          });
    },
    toggleCardTv() {
      setTimeout(() => {
        if (this.isOverTv) {
          this.showCardTv = true;
        }
      }, 500);
    },
    infoDetails(type, id) {
      fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&append_to_response=release_dates`)
          .then(response => response.json())
          .then(data => {
            if (type === "movie") {
              this.infoMovie = data;
              for (this.i = 0; this.i < this.infoMovie.release_dates.results.length - 1; this.i++) {
                if (this.infoMovie.release_dates.results[this.i].iso_3166_1 === "FR") {
                  this.ageLimitMovie = this.infoMovie.release_dates.results[this.i].release_dates[0].certification;
                  console.log(this.infoMovie.release_dates.results[this.i]);
                }
              }
            } else {
              this.infoTv = data;
            }
          }).catch(error => {
        console.log(error);
      });
    },
    searchResults() {
      this.showMoreTv = false;
      this.showMore = false;
      if (this.$route.query.q === "") {
        this.$router.push({path: '/'});
      }
      this.resultsMovie = [];
      this.resultsTv = [];
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&query=${this.$route.query.q}`)
          .then(response => response.json())
          .then(data => {
            for (this.i = 0; this.i < data.results.length; this.i++) {
              if (data.results[this.i].media_type === "movie") {
                this.resultsMovie.push(data.results[this.i]);
              }
              if (data.results[this.i].media_type === "tv") {
                this.resultsTv.push(data.results[this.i]);
              }
            }
          }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.description {
  font-family: CineFindLight;
  display: flex;
  width: 100%;
  height: 50px;
  gap: 10px;
  align-items: center;
  justify-content: start;
  margin-left: 20px;
}

.container-block-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.block-btn {
  display: flex;
  border-radius: 10px;
  width: 150px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgba(109, 109, 110, 0.7);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.block-btn i {
  font-size: 30px;
}

.block-btn:hover {
  background-color: rgba(78, 78, 79, 0.7);
}

.btnMore {
  z-index: 2;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.btnMore p {
  font-size: 15px;
  background-color: rgba(109, 109, 110, 0.7);
  text-align: center;
  font-family: CineFindLight, serif;
  transition: all ease-in-out 0.3s;
  border-radius: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 10px;
  width: 22px;
  cursor: pointer;
}

.btnMore p:hover {
  background-color: rgba(109, 109, 110, 0.3);
}

.moreOff {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.moreOn {
  position: relative;
  z-index: 1;
  opacity: 1;
}

.card {
  width: 400px;
  height: 400px;
  position: absolute;
  top: -50px;
  left: -60px;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  z-index: -1;
  transition: all ease-in-out 0.3s;
}

.cardTv {
  width: 400px;
  height: 400px;
  position: absolute;
  top: -50px;
  left: -60px;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  z-index: -1;
  transition: all ease-in-out 0.3s;
}

.card img, .cardTv img {
  width: 100%;
  height: 60%;
  border-radius: 10px 10px 0 0;
}

.body-search {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

h2 {
  font-size: 30px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  z-index: 1;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}

.itemResult {
  width: 290px;
  height: 180px;
}

.block-tv, .block-movie {
  width: 94.4%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.movies, .tv {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: start;
}

.block-item {
  position: relative;
}
</style>