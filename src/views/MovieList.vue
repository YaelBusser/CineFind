<template>
  <div class="block-movieList">
    <div v-if="this.movies.length === 0">Aucun résultat pour votre recherche : {{this.$route.query.q}}</div>
    <p v-if="categorie">{{ categorie }}</p>
    <p>Résultats : <span v-if="resultats">{{ resultats }}</span></p>
    <div class="blockButtonPage">
      <button @click="changePage(page-1)" v-if="pagePrev !== 0"><i class="fa-solid fa-chevron-left"></i></button>
      <button @click="changePage(minPage)" v-if="pagePrev !== 0 && page !== 2">{{ minPage }}</button>
      <button @click="changePage(page-1)" v-if="pagePrev !== 0">{{ pagePrev }}</button>
      <button disabled>{{ page }}</button>
      <button @click="changePage(page+1)" v-if="pageNext <= totalPages">{{ pageNext }}</button>
      <button @click="changePage(totalPages)" v-if="page !== totalPages && pageNext !== totalPages">{{
          totalPages
        }}
      </button>
      <button @click="changePage(page+1)" v-if="pageNext <= totalPages"><i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div v-if="isSearching">
      <div class="blockMovieListSkeleton">
        <div v-for="i in 20">
          <div class="movieListSkeleton">
            <div class="voteAverageSkeleton"></div>
            <div class="descriptionMovieSkeleton">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="blockMovieList">
        <div v-for="movie in movies" class="movieList" @mouseenter="showDetails = movie.id"
             @mouseleave="showDetails = -1">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
               :class="{ 'details': showDetails === movie.id }">
          <p class="voteAverage">{{ parseFloat(movie.vote_average.toFixed(1)) }}</p>
          <div class="descriptionMovie" :class="{'expanded' : showDetails === movie.id}">
            <div class="container-descriptionMovie-p">
              <p>{{ movie.title }}</p>
            </div>
            <button :class="showDetails === movie.id ? 'buttonOn' : 'buttonOff'">Détails</button>
          </div>
        </div>
      </div>
      <div class="blockButtonPage">
        <button @click="changePage(page-1)" v-if="pagePrev !== 0"><i class="fa-solid fa-chevron-left"></i></button>
        <button @click="changePage(minPage)" v-if="pagePrev !== 0 && page !== 2">{{ minPage }}</button>
        <button @click="changePage(page-1)" v-if="pagePrev !== 0">{{ pagePrev }}</button>
        <button disabled>{{ page }}</button>
        <button @click="changePage(page+1)" v-if="pageNext <= totalPages">{{ pageNext }}</button>
        <button @click="changePage(totalPages)" v-if="page !== totalPages && pageNext !== totalPages">{{
            totalPages
          }}
        </button>
        <button @click="changePage(page+1)" v-if="pageNext <= totalPages"><i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      movies: [],
      showDetails: -1,
      isSearching: false,
      queryMovie: "",
      categorie: "",
      minPage: 1,
      totalPages: "",
      page: 1,
      pagePrev: 0,
      pageNext: 2,
      resultats: "",
      requestMovieList: "",
    }
  },
  async created() {
    // appel initial pour obtenir les données à afficher
    await this.getData();
  },
  watch: {
    // watch sur $route pour détecter les changements d'URL
    $route: {
      handler: 'getData', // appelle getData() lorsque $route change
      immediate: true // appelle handler immédiatement au chargement initial
    }
  },
  methods: {
    async getData() {
      if (!this.$route.query.q) {
        this.$router.replace({ path: "/" });
      }
      if (this.$route.query.q) {
        await this.movieListSearch();
      } else {
        await this.movieListPop();
      }
    },
    async movieListSearch() {
      this.isSearching = true;
      this.requestMovieList = "https://api.themoviedb.org/3/search/movie?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&query=" + this.$route.query.q;
      fetch(`${this.requestMovieList}`)
          .then(response => response.json())
          .then(data => {
            this.movies = data.results;
            this.isSearching = false;
            if (data.total_pages > 500) {
              this.totalPages = 500;
            } else {
              this.totalPages = data.total_pages;
            }
            this.resultats = data.total_results;
            this.page = 1;
            this.pagePrev = 0;
            this.pageNext = 2;
          }).catch(error => {
        console.log(error);
      });
      this.categorie = "Mots clés : " + this.$route.query.q;
      if (this.$route.query.q === "") {
        await this.movieListPop();
      }
    },
    async movieListPop() {
      this.isSearching = true;
      this.requestMovieList = "https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr";
      fetch(`${this.requestMovieList}`)
          .then(response => response.json())
          .then(data => {
            this.movies = data.results;
            this.isSearching = false;
            if (data.total_pages > 500) {
              this.totalPages = 500;
            } else {
              this.totalPages = data.total_pages;
            }
            this.resultats = data.total_results;
            this.page = data.page;
          }).catch(error => {
        console.log(error);
      });
      this.categorie = "Films populaires";
    },

    changePage(laPage) {
      this.page = laPage;
      this.pageNext = this.page + 1;
      this.pagePrev = this.page - 1;
      this.isSearching = true;
      if (this.requestMovieList.includes("search")) {
        fetch(`${this.requestMovieList}&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
              this.movies = data.results;
              this.isSearching = false;
              if (data.total_pages > 500) {
                this.totalPages = 500;
              } else {
                this.totalPages = data.total_pages;
              }
              this.resultats = data.total_results;
            }).catch(error => {
          console.log(error);
        });
      } else {
        fetch(`${this.requestMovieList}&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
              this.movies = data.results;
              this.isSearching = false;
              if (data.total_pages > 500) {
                this.totalPages = 500;
              } else {
                this.totalPages = data.total_pages;
              }
              this.resultats = data.total_results;
            }).catch(error => {
          console.log(error);
        });
      }
    },
  },
  mounted() {
    this.getData();
  }
}
</script>
<style scoped>
.block-movieList{
  margin-top: 10rem;
}
.descriptionMovieSkeleton{
  position: absolute;
  bottom: -15px;
  background-color: rgba(0,0,0,0.1);
  width: 100%;
  height: 95px;
}

.blockSearching img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100px;
}

.blockButtonPage {
  display: flex;
  gap: 10px;
}
.voteAverageSkeleton {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  padding: 0.5rem !important;
  width: 20px;
  height: 20px;
  font-size: 12px;
}
.voteAverage {
  position: absolute;
  top: 0;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 0.5rem !important;
  width: 20px;
  font-size: 12px;
}
.blockMovieListSkeleton{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.blockMovieList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.blockMovieList p {
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}

.descriptionMovie {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: -75%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 10px 10px;
  transition: all 0.2s ease-in-out;
}

.expanded {
  transform: translateY(-15%);
}

.descriptionMovie button {
  transition: all ease-in-out 0.2s;
}
.movieListSkeleton{
  position: relative;
  overflow: hidden;
  width: 220px;
  height: 332px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(255,255,255,0.1);
}
.movieList {
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
}

.movieList img {
  width: 220px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 10px 10px;
  transition: all ease-in-out 0.2s;
}

.details {
  transform: scale(1.1);
}

button {
  transition: all 0.2s ease-in-out;
  margin-bottom: 10px;
}

.container-descriptionMovie-p {
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  position: absolute;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;

}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>