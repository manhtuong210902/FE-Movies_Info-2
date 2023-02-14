import MovieItem from "./MoiveItem.js"
import store from "../store/store.js"
import { apiKey } from "../constants/index.js"

const ListMoive = {
    data(){
        return {
            store,
            title: '',
            id: '',
            loading: true,
            movies_1: [],
            movies_2: [],
            movies_3: [],
            movies_4: [],
            movies_5: [],
        }
    },

    props: ['type'],

    methods: {
        async loadPosters(){
            let rs = {}
            if(this.type == 'popular-movie'){
                let res = await fetch(`https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`, {
                method : "GET",
                mode: 'cors',
            })
                rs = await res.json()
            }
            else{
                let res = await fetch(`https://imdb-api.com/en/API/Top250Movies/${apiKey}`, {
                method : "GET",
                mode: 'cors',
            })
                rs = await res.json()
            }
            this.loading = false;
            
            //lấy 3 phim đầu tiên
            for(let i = 0; i < 3; i++){
                this.movies_1.push(rs.items[i])
            }

            for(let i = 3; i < 6; i++){
                this.movies_2.push(rs.items[i])
            }

            for(let i = 6; i < 9; i++){
                this.movies_3.push(rs.items[i])
            }

            for(let i = 9; i < 12; i++){
                this.movies_4.push(rs.items[i])
            }

            for(let i = 12; i < 15; i++){
                this.movies_5.push(rs.items[i])
            }
        },

        changeTitle(){
            if(this.type == 'popular-movie'){
                this.title = 'Most Popular'
            }
            else{
                this.title = 'Top Rating'
            }
            this.id = `#${this.type}`
        },
    },

    mounted(){
        this.loadPosters()
        this.changeTitle()
    },

    components: {
        MovieItem,
    },

    template: `
    <div class="spinner-border mt-4" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div class="mt-4" v-if="!loading">
        <h4>{{title}}</h4>
        <div :id="type" class="carousel slide" data-bs-interval="false">
            <div class="carousel-indicators">
                <button
                    type="button"
                    :data-bs-target="id"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    :data-bs-target="id"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    :data-bs-target="id"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
                <button
                    type="button"
                    :data-bs-target="id"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                ></button>
                <button
                    type="button"
                    :data-bs-target="id"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                ></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row">
                        <MovieItem v-for="(movie, index) in movies_1" :data="movie"/>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <MovieItem v-for="(movie, index) in movies_2" :data="movie"/>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <MovieItem v-for="(movie, index) in movies_3" :data="movie"/>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <MovieItem v-for="(movie, index) in movies_4" :data="movie"/>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <MovieItem v-for="(movie, index) in movies_5" :data="movie"/>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                :data-bs-target="id"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                :data-bs-target="id"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}

export default ListMoive