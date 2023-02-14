import store from "../store/store.js"

const MovieItem = {
    data(){
        return {
            store,
        }
    },

    props: ['data'],

    methods: {   
        handleClickMovieItem(id){
            this.store.idDetail = id
            this.store.currentComponent = 'MovieDetail'
        }
    },

    template: `
    <div class="col-4 slider_item" @click="handleClickMovieItem(data.id)">
        <img
            :src="data.image"
            class="d-block slider_img"
            :alt="data.title"
        />
        <div class="alert alert-light bg-light text-dark slider_info" role="alert">
            {{data.fullTitle}}
        </div>
    </div>
    `
}

export default MovieItem