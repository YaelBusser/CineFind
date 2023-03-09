import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Movies from "../views/Movies.vue";
import MovieList from "../views/MovieList.vue";
const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Movies',
        path: '/movies',
        component: Movies,
    },
    {
        name: 'MovieList',
        path: '/search',
        component: MovieList,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;