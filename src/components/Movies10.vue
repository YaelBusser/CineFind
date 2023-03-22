<template>
  <div class="container">
    <div class="block-main-moviestop10">
      <h2>Top 10 des films aujourd'hui</h2>
      <div class="slide">
        <!--<div v-for="(movie, index) in movies" class="content-top10"
             :style="index === 9 ? `transition: all ${transitionTimeP3}s ease-in-out; transform: translateX(${p10}px)`
             : `display: none;` "
             :id="`movie${index}`">
          <svg :id="`item${index}`" width="100%" height="100%" v-if="index === 9"
               :viewBox="click % 2 === 1 ? viewBox[index] : viewBox[index]"
               class="svg">
            <path stroke="#595959" stroke-linejoin="square" stroke-width="4"
                  :d="click % 2 === 1 ? logoNumber[index] : logoNumber[index]"></path>
          </svg>
          <img class="itemPoster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
        </div>-->
        <div v-for="(movie, index) in movies" class="content-top10" @mouseover="idVideoCard = movie.id; showCardMovie = true; idMovieHover = index; getVideoCard()"
             :style="index < 5 ? `transition: all ${transitionTimeP1}s ease-in-out; transform: translateX(calc(${p1}vw + ${index * p2}vw))`
             : `transition: all ${transitionTimeP2}s ease-in-out; transform: translateX(calc(${p5}vw + ${index * p2}vw))` "
             :id="`movie${index}`">
          <svg :id="`item${index}`" width="100%" height="100%"
               :viewBox="click % 2 === 1 ? viewBox[index] : viewBox[index]"
               class="svg">
            <path stroke="#595959" stroke-linejoin="square" stroke-width="4"
                  :d="click % 2 === 1 ? logoNumber[index] : logoNumber[index]"></path>
          </svg>
          <img class="itemPoster"
               :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
          <div v-if="showCardMovie && idMovieHover === index" class="cardMovie" onmouseleave="showCardMovie = false;"
               @mouseleave="showCardMovie = false"
          >
            <iframe
                :src="videoUrl()"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <div class="parent-block-btn">
              <div class="block-btn" @click="showMovieInfos">
                <i class="fa-solid fa-circle-info"></i>
                <p>Plus d'infos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="switchLeft sliderButton" @click="sliderScrollLeft">❮</a>
    <a class="switchRight sliderButton" @click="sliderScrollRight">❯</a>
  </div>
</template>
<script>
import {forEach} from "@splidejs/splide/src/js/utils";
import {delay} from "lodash";

export default {
  name: "VideoTrailer",
  data() {
    return {
      showBlockMovieInfos: false,
      idVideoCard: 0,
      videoCard: [],
      srcVideo: null,
      showCardMovie: false,
      idMovieHover: null,
      movies: [],
      logoNumber: [],
      viewBox: [],
      i: 0,
      click: 0,
      p1: 15,
      p5: 15,
      p10: 250,
      p2: 17,
      transitionTimeP1: 0.5,
      transitionTimeP2: 0.5,
      transitionTimeP3: 0.5,
      logoNumber1: "M35.377 152H72V2.538L2 19.362v30.341l33.377-8.459V152z",
      logoNumber2: "M3.72 152H113v-30.174H50.484l4.355-3.55 29.453-24.012c5.088-4.124 9.748-8.459 13.983-13.004 4.16-4.464 7.481-9.339 9.972-14.629 2.449-5.203 3.678-11.113 3.678-17.749 0-9.428-2.294-17.627-6.875-24.645-4.597-7.042-10.941-12.494-19.07-16.376C77.803 3.957 68.496 2 58.036 2 47.591 2 38.37 4.023 30.347 8.06c-8.015 4.032-14.457 9.578-19.352 16.654-4.492 6.493-7.389 13.803-8.693 21.952h34.055c1.236-3.52 3.398-6.52 6.459-8.97 3.54-2.834 8.277-4.224 14.147-4.224 5.93 0 10.552 1.537 13.76 4.681 3.181 3.12 4.791 7.024 4.791 11.594 0 4.151-1.16 7.934-3.468 11.298-2.192 3.194-5.987 7.124-11.405 11.84L3.72 122.465V152z",
      logoNumber3: "M 3.809 41.577 h 33.243 c 1.3 -2.702 3.545 -4.947 6.674 -6.72 c 3.554 -2.015 7.83 -3.01 12.798 -3.01 c 5.555 0 10.14 1.11 13.723 3.376 c 3.839 2.427 5.782 6.283 5.782 11.315 c 0 4.553 -1.853 8.395 -5.473 11.38 c -3.547 2.926 -8.18 4.37 -13.821 4.37 H 41.44 v 28.366 h 16.77 c 5.572 0 10.275 1.227 14.068 3.711 c 4.02 2.633 6.071 6.581 6.071 11.616 c 0 5.705 -1.943 9.975 -5.853 12.562 c -3.658 2.42 -8.292 3.61 -13.863 3.61 c -5.205 0 -9.82 -0.94 -13.827 -2.836 c -3.698 -1.75 -6.32 -4.272 -7.785 -7.529 H 2.33 c 2.096 12.089 7.761 21.65 17.028 28.78 C 29.242 148.175 42.594 152 59.476 152 c 10.706 0 20.175 -1.783 28.42 -5.337 c 8.185 -3.528 14.575 -8.486 19.208 -14.884 c 4.595 -6.346 6.896 -13.938 6.896 -22.837 c 0 -6.952 -1.93 -13.494 -5.81 -19.666 c -3.815 -6.07 -9.68 -10.367 -17.683 -12.908 l -5.46 -1.735 l 5.353 -2.04 c 6.659 -2.538 11.667 -6.338 15.083 -11.412 c 3.431 -5.096 5.142 -10.806 5.142 -17.181 c 0 -8.471 -2.262 -15.778 -6.787 -21.985 c -4.574 -6.275 -10.7 -11.17 -18.408 -14.696 C 77.683 3.775 69.109 2 59.687 2 C 44.084 2 31.515 5.816 21.91 13.415 c -9 7.119 -15.025 16.486 -18.101 28.162 Z",
      logoNumber4: "M 72 152 h 35.333 v -30.977 H 128 V 92.497 h -20.667 V 2 H 69.89 L 2 92.712 v 28.311 h 70 V 152 Z M 36.202 92.188 l 35.93 -47.998 v 47.998 h -35.93 Z",
      logoNumber5: "M 105.588 32.174 V 2 H 13.534 l -8.3 88.357 h 32.463 c 2.145 -2.362 4.866 -4.254 8.143 -5.675 c 3.585 -1.554 7.543 -2.328 11.859 -2.328 c 6.247 0 11.418 1.745 15.418 5.255 c 4.061 3.564 6.104 8.37 6.104 14.265 c 0 6.041 -2.044 10.89 -6.121 14.387 c -3.999 3.43 -9.162 5.132 -15.401 5.132 c -4.299 0 -8.17 -0.694 -11.601 -2.095 c -3.11 -1.268 -5.577 -2.946 -7.368 -5.042 H 2.592 c 3.308 11.593 9.782 20.623 19.46 27.164 C 32.472 148.464 45.64 152 61.602 152 c 10.12 0 19.294 -1.99 27.548 -5.966 c 8.198 -3.949 14.711 -9.718 19.572 -17.335 c 4.844 -7.59 7.278 -16.95 7.278 -28.123 c 0 -9.182 -2.013 -17.314 -6.032 -24.431 c -4.02 -7.118 -9.514 -12.7 -16.51 -16.775 c -6.99 -4.072 -14.849 -6.109 -23.612 -6.109 c -11.06 0 -20.099 3.483 -27.234 10.461 l -3.892 3.806 l 3.273 -35.354 h 63.595 Z",
      logoNumber6: "M 79.482 38.192 h 35.551 c -3.284 -10.945 -8.963 -19.573 -17.048 -25.938 C 89.323 5.434 77.531 2 62.545 2 C 50.756 2 40.35 4.86 31.277 10.577 c -9.064 5.712 -16.198 14.09 -21.412 25.178 C 4.63 46.893 2 60.425 2 76.365 c 0 14.416 2.356 27.344 7.059 38.798 c 4.667 11.368 11.573 20.34 20.734 26.956 C 38.904 148.7 50.225 152 63.816 152 a 61.513 61.513 0 0 0 19.922 -3.278 a 53.546 53.546 0 0 0 17.378 -9.792 c 5.154 -4.33 9.255 -9.64 12.314 -15.947 c 3.042 -6.273 4.57 -13.556 4.57 -21.868 c 0 -8.812 -2.062 -16.636 -6.182 -23.51 c -4.134 -6.897 -9.643 -12.293 -16.55 -16.212 c -6.905 -3.917 -14.48 -5.874 -22.76 -5.874 c -14.546 0 -25.34 4.55 -32.569 13.63 l -4.003 5.03 l 0.443 -6.413 c 0.874 -12.636 3.56 -21.85 8.168 -27.654 c 4.69 -5.907 10.885 -8.9 18.421 -8.9 c 4.26 0 7.826 0.734 10.685 2.24 c 2.445 1.287 4.396 2.867 5.829 4.74 Z M 62.605 123 c -5.825 0 -10.902 -1.894 -15.136 -5.655 C 43.173 113.528 41 108.603 41 102.71 c 0 -5.881 2.164 -10.864 6.44 -14.818 C 51.674 83.975 56.762 82 62.604 82 c 5.847 0 10.906 1.98 15.074 5.905 C 81.878 91.859 84 96.837 84 102.71 c 0 5.885 -2.131 10.805 -6.35 14.622 c -4.167 3.77 -9.214 5.668 -15.045 5.668 Z",
      logoNumber7: "M 113 2 L 2 2 L 2 33.4023 L 75.9666 33.4023 L 21.2257 152 L 60.281 152 L 113 32.7672 L 113 2 Z",
      logoNumber8: "M 59.5 152 c 11.335 0 21.358 -1.72 30.077 -5.15 c 8.637 -3.397 15.361 -8.258 20.213 -14.586 c 4.805 -6.267 7.21 -13.876 7.21 -22.899 c 0 -7.326 -2.261 -14.07 -6.813 -20.29 c -4.548 -6.214 -10.837 -10.658 -18.922 -13.35 l -5.4 -1.799 l 5.338 -1.975 c 7.238 -2.678 12.572 -6.683 16.066 -12.018 c 3.53 -5.388 5.284 -11.178 5.284 -17.414 c 0 -7.912 -2.133 -14.839 -6.405 -20.84 c -4.3 -6.042 -10.403 -10.825 -18.345 -14.351 C 79.816 3.78 70.386 2 59.5 2 S 39.184 3.781 31.197 7.328 c -7.942 3.526 -14.044 8.309 -18.345 14.351 c -4.272 6.001 -6.405 12.928 -6.405 20.84 c 0 6.236 1.755 12.026 5.284 17.414 c 3.494 5.335 8.828 9.34 16.066 12.018 l 5.338 1.975 l -5.4 1.798 c -8.085 2.693 -14.374 7.137 -18.922 13.351 C 4.261 95.295 2 102.04 2 109.365 c 0 9.023 2.405 16.632 7.21 22.899 c 4.852 6.328 11.576 11.19 20.213 14.586 c 8.72 3.43 18.742 5.15 30.077 5.15 Z m 0.5 -89 c -5.6 0 -10.334 -1.515 -14.125 -4.56 C 41.985 55.313 40 51.183 40 46.21 c 0 -5.244 1.976 -9.518 5.875 -12.65 C 49.666 30.515 54.4 29 60 29 s 10.334 1.515 14.125 4.56 C 78.025 36.694 80 40.968 80 46.212 c 0 4.973 -1.985 9.103 -5.875 12.228 C 70.334 61.485 65.6 63 60 63 Z m -0.5 62 c -6.255 0 -11.556 -1.613 -15.836 -4.856 c -4.41 -3.343 -6.664 -7.816 -6.664 -13.25 c 0 -5.298 2.258 -9.698 6.664 -13.038 C 47.944 90.613 53.245 89 59.5 89 c 6.255 0 11.556 1.613 15.836 4.856 c 4.406 3.34 6.664 7.74 6.664 13.038 c 0 5.434 -2.254 9.907 -6.664 13.25 C 71.056 123.387 65.755 125 59.5 125 Z",
      logoNumber9: "M 40.0597 115.808 L 4.47328 115.808 C 7.45109 126.586 13.4363 135.155 22.4671 141.582 C 32.2129 148.518 44.564 152 59.576 152 C 78.2142 152 92.5106 145.698 102.645 133.075 C 112.854 120.36 118 101.544 118 76.5769 C 118 62.1603 115.679 49.3016 111.047 37.9886 C 106.453 26.7698 99.6242 17.9803 90.5435 11.5768 C 81.5018 5.20073 70.1375 2 56.3958 2 C 49.4158 2 42.6823 3.15952 36.185 5.47967 C 29.7046 7.79377 23.8783 11.1933 18.6949 15.6846 C 13.5317 20.1584 9.45924 25.5084 6.46782 31.7491 C 3.49282 37.9556 2 45.0644 2 53.0962 C 2 61.9117 4.02798 69.7019 8.07889 76.5057 C 12.1435 83.3323 17.5833 88.6925 24.4219 92.6108 C 31.2518 96.5242 38.8591 98.4808 47.2792 98.4808 C 55.0854 98.4808 61.6096 97.3619 66.8547 95.1478 C 72.057 92.9518 76.4513 89.597 80.0606 85.0622 L 84.0585 80.0391 L 83.6208 86.444 C 82.7475 99.2241 80.0984 108.438 75.5533 114.107 C 70.931 119.872 64.7727 122.788 57.2438 122.788 C 52.8691 122.788 49.1904 122.1 46.2125 120.693 C 43.593 119.455 41.5308 117.826 40.0597 115.808 Z M 57.5 31 C 63.3657 31 68.442 32.9365 72.63 36.7826 C 76.861 40.6682 79 45.6186 79 51.5 C 79 57.3814 76.861 62.3318 72.63 66.2174 C 68.442 70.0635 63.3657 72 57.5 72 C 51.6343 72 46.558 70.0635 42.37 66.2174 C 38.139 62.3318 36 57.3814 36 51.5 C 36 45.6186 38.139 40.6682 42.37 36.7826 C 46.558 32.9365 51.6343 31 57.5 31 Z",
      logoNumber10: "M 34.757 151.55 h 35.869 V 2.976 L 2 19.687 v 30.14 l 32.757 -8.41 v 110.132 Z m 105.53 3.45 c 12.394 0 23.097 -3.12 32.163 -9.353 c 9.093 -6.25 16.11 -15.047 21.066 -26.43 C 198.5 107.766 201 94.196 201 78.5 c 0 -15.698 -2.5 -29.266 -7.484 -40.716 c -4.955 -11.384 -11.973 -20.18 -21.066 -26.431 C 163.384 5.119 152.681 2 140.287 2 c -12.393 0 -23.096 3.12 -32.162 9.353 c -9.093 6.25 -16.11 15.047 -21.066 26.43 c -4.984 11.45 -7.484 25.02 -7.484 40.717 c 0 15.698 2.5 29.266 7.484 40.716 c 4.955 11.384 11.973 20.18 21.066 26.431 c 9.066 6.234 19.769 9.353 32.162 9.353 Z m 0 -31.368 c -7.827 0 -13.942 -4.147 -18.15 -12.178 c -4.053 -7.736 -6.047 -18.713 -6.047 -32.954 s 1.994 -25.218 6.047 -32.954 c 4.208 -8.03 10.323 -12.178 18.15 -12.178 c 7.827 0 13.943 4.147 18.15 12.178 c 4.053 7.736 6.048 18.713 6.048 32.954 s -1.995 25.218 -6.047 32.954 c -4.208 8.03 -10.324 12.178 -18.15 12.178 Z",
      viewBox1: "-20 0 70 154",
      viewBox2: "0 0 80 154",
      viewBox3: "0 0 80 154",
      viewBox4: "0 0 81 154",
      viewBox5: "0 0 81 154",
      viewBox6: "-20 0 70 154",
      viewBox7: "-20 0 70 154",
      viewBox8: "-20 0 70 154",
      viewBox9: "-20 0 70 154",
      viewBox10: "0 0 140 154",
    }
  },
  mounted() {
    this.moviePopular();
    this.moviePopular2();
    this.getNumber();
    this.getViewBox();
    this.placeMovies();
  },
  methods: {
    showMovieInfos() {
      this.$emit('card-movie-little', this.idVideoCard);
    },
    async getVideoCard() {
      fetch(`https://api.themoviedb.org/3/movie/${this.idVideoCard}/videos?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr`)
          .then(response => response.json())
          .then(data => {
            this.videoCard = data.results;
          }).catch(error => {
        console.log(error);
      });
    },
    videoUrl() {
      if (this.videoCard.length > 0) {
        const videoKey = this.videoCard[0].key;
        return `https://www.youtube.com/embed/${videoKey}?loop=1&controls=0&autoplay=1&mute=1&vq=hd1080&autohide=1&showinfo=0&modestbranding=1&playlist=${videoKey}`;
      }
      return "";
    },
    async placeMovies() {
      this.p10 = -70;
    },
    async moviePopular() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            data = data.results.slice(0, 10);
            this.movies = data;
          }).catch(error => {
        console.log(error);
      });
    },
    async moviePopular2() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            data = data.results.slice(0, 10);
            this.movies2 = data;
          }).catch(error => {
        console.log(error);
      });
    },
    async moviePopularAddFromTo5() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            for (this.i = 0; this.i < 5; this.i++) {
              this.movies.push(data.results[this.i]);
            }
          }).catch(error => {
        console.log(error);
      });
    },
    async moviePopularAdd5toEnd() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f49de7ae4e7847f4cd272851ed07488&language=fr&page=1")
          .then(response => response.json())
          .then(data => {
            data = data.results;
            for (this.i = 5; this.i < 10; this.i++) {
              this.movies.push(data[this.i]);
            }
          }).catch(error => {
        console.log(error);
      });
    },
    getViewBox() {
      this.viewBox.push(this.viewBox1);
      this.viewBox.push(this.viewBox2);
      this.viewBox.push(this.viewBox3);
      this.viewBox.push(this.viewBox4);
      this.viewBox.push(this.viewBox5);
      this.viewBox.push(this.viewBox6);
      this.viewBox.push(this.viewBox7);
      this.viewBox.push(this.viewBox8);
      this.viewBox.push(this.viewBox9);
      this.viewBox.push(this.viewBox10);
    },
    getNumber() {
      this.logoNumber.push(this.logoNumber1);
      this.logoNumber.push(this.logoNumber2);
      this.logoNumber.push(this.logoNumber3);
      this.logoNumber.push(this.logoNumber4);
      this.logoNumber.push(this.logoNumber5);
      this.logoNumber.push(this.logoNumber6);
      this.logoNumber.push(this.logoNumber7);
      this.logoNumber.push(this.logoNumber8);
      this.logoNumber.push(this.logoNumber9);
      this.logoNumber.push(this.logoNumber10);
    },
    async sliderScrollLeft() {
      this.click++;
      if(this.click % 2 === 1){
        this.p1 = -70;
        this.p5 = -70;
      }else {
        this.p1 = 15;
        this.p5 = 15;
      }
    },
    async sliderScrollRight() {
      this.click++;
      if(this.click % 2 === 1){
      this.p1 = -70;
      this.p5 = -70;
      }else {
        this.p1 = 15;
        this.p5 = 15;
      }
    },
  },
}

</script>
<style scoped>
.parent-block-btn{
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 12vh;
}
.block-btn {
  width: 10vw;
  height: 6vh;
  font-size: 1vw;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  font-family: CineFindMedium, serif;
  border: none;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  border-radius: 10px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.block-btn:hover {
  background-color: rgba(78, 78, 79, 0.7);
}

iframe {
  border: none;
  clip-path: inset(2vw 0vw);
  transform: scale(2.2);
  width: 15vw;
  height: 20vh;
  pointer-events: none;
}

.cardMovie {
  width: 25vw;
  height: 35vh;
  position: absolute;
  top: -2vw;
  left: -10vw;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  opacity: 1;
  z-index: 50;
  transition: all ease-in-out 0.5s;
}

.container {
  margin-top: 200px;
  position: relative;
}

.switchLeft, .switchRight {
  color: white;
  font-weight: bold;
  font-size: 25px;
  font-family: CineFindBold, serif;
  z-index: 3;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: none;
}

.switchLeft:hover, .switchRight:hover {
  background: linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, #141414 90%, #141414);
  font-size: 35px;
}

.switchLeft {
  left: 0;
  top: 0;
}

.switchRight {
  top: 0;
  right: 0;
}

.block-main-moviestop10 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #e3e3e3;
  font-family: CineFindMedium, serif;
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 50px;
  overflow: hidden;
}

.block-main-moviestop10 h2 {
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: left;
  font-size: 1.4vw;
  line-height: 1.25vw;
  padding-left: 75px;
}

.slide {
  display: flex;
  gap: 50px;
  width: 100vw;
  height: 25vh;
  position: relative;
}

.slide img {
  width: 7.8vw;
  height: 100%;
  border-radius: 0 10px 10px 0;
  z-index: 1;
}

.content-top10 {
  position: absolute;
  top: 0;
  bottom: 0;
}

svg {
  position: absolute;
  left: -7.8vw;
  z-index: 0;
  top: 0;
  bottom: 0;
}
</style>