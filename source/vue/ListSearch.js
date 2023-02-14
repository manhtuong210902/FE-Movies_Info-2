
import MovieCard from "./MovieCard.js"
import store from "../store/store.js"
import { apiKey } from "../constants/index.js"

const ListSearch = {
    data(){
        return {
            store,
            movies: [],
            moviesShowonPage: [],
            currPage: 1,
            numberOfPage: 0,
        }
    },

    components: {
        MovieCard,
    },

    props: ['searchValue'],

    methods: {
        async loadPosters(value){
            console.log(value)
            const api = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${value}`
            const res = await fetch(api, {
                method : "GET",
                mode: 'cors',
            })
            const rs = await res.json()
            this.movies = rs.results;

            console.log(this.movies)

            this.numberOfPage = Math.ceil(this.movies.length / 6);
            this.moviesShowonPage = []
            let n = this.movies.length <= 6 ? this.movies.length : 6;
            for(let i = 0; i < n; i++){
                this.moviesShowonPage.push(this.movies[i]);
            }
        },

        handleChangePage(event, index){
            const pageActiveBtn = $(".page-item.active");
            if(Number(index) == this.currPage){
                return
            }

            this.currPage = Number(index);
            const listPageItem = $(".page-item");
            const pageSelectedBtn = listPageItem.get(Number(index)-1);
            pageActiveBtn.removeClass('active');
            pageSelectedBtn.classList.add('active');
            this.moviesShowonPage = this.movies.slice(6 * (Number(index) - 1), 6 * (Number(index) - 1) + 6);
        }
    },

    watch: { 
        searchValue: function(newVal, oldVal) { // watch it
           this.loadPosters(newVal)
        }
    },

    mounted(){
        this.loadPosters(this.searchValue)
    },

    template: `
    <div class="search-container mt-5">
        <div class="row">
            <MovieCard v-for="(movie, index) in moviesShowonPage" :data="movie" />
        </div>
        <nav class="mt-5">
            <ul class="pagination d-flex justify-content-center gap-2">
                <li class="page-item" :class="{ 'active': index === 0 }" v-for="(num,index) in numberOfPage" @click="handleChangePage($event, index+1)">
                    <a class="page-link" href="#">{{num}}</a>
                </li>
            </ul>
        </nav>
    </div>
    `
}

export default ListSearch