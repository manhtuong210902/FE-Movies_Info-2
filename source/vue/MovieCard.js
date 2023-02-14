import store from "../store/store.js"
const MovieCard = {
    data(){
        return {
            store,
        }
    },

    props: ['data'],

    methods: {   
        handleClickMovieCard(id){
            this.store.idDetail = id
            this.store.currentComponent = 'MovieDetail'
        }
    },

    template: `
    <div class="col-4" @click="handleClickMovieCard(data.id)">
        <div class="card card_search">
            <img
                :src="data.image"
                class="card-img-top"
                alt="..."
            />
            <div class="card-body text-center text-dark">
                <h6>{{data.title}}</h6>
                <p class="card-text">{{data.description ? data.description : data.year}}</p>
            </div>
        </div>
    </div>
    `
}

export default MovieCard