import store from "../store/store.js"
import { apiKey } from "../constants/index.js"
const Banner = {
    data(){
        return {
            store,
            loading: true,
            posters: []
        }
    },

    methods: {
        async loadPosters(){
            const res = await fetch(`https://imdb-api.com/en/API/InTheaters/${apiKey}`, {
                method : "GET",
                mode: 'cors',
            })
            const rs = await res.json()
            this.loading = false;
            //lấy 5 phim đầu tiên
            for(let i = 0; i < 5; i++){
                this.posters.push(rs.items[i]);
            }
        },

        handleClickPoster(id){
            this.store.idDetail = id
            this.store.currentComponent = 'MovieDetail'
        }
    },

    mounted(){
        this.loadPosters()
    },

    template: `
    <div class="spinner-border mt-4" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div class="banner mt-2" v-if="!loading">
        <div id="banner" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
                <button
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                ></button>
                <button
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                ></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item banner-item" v-for="(poster, index) in posters" :class="{active: index == 0}" @click="handleClickPoster(poster.id)">
                    <img
                        :src="poster.image"
                        class="d-block banner_img"
                        :alt="poster.title"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{poster.fullTitle}}</h5>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#banner"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#banner"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    
    `
}

export default Banner;