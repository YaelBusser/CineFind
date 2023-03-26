import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Movies from "../views/Movies.vue";
import MovieList from "../views/MovieList.vue";
import Series from "../views/Series.vue";
import Search from "../views/Search.vue";
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
        name: 'Search',
        path: '/search',
        component: Search,
    },
    {
        name: 'Series',
        path: '/series',
        component: Series,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;