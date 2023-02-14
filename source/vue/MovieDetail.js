import store from "../store/store.js"
import { apiKey } from "../constants/index.js"
const MovieDatail = {
    data(){
        return{
            store,
            details: {},
            reviews: [],
        }
    },

    methods: {
        async loadDetailMovie(id){
            console.log(id)
            const res = await fetch(`https://imdb-api.com/API/Title/${apiKey}/${id}`, {
                method : "GET",
                mode: 'cors',
            })
            const rs = await res.json()
            this.details = rs;
        },

        async loadReviewMovie(id){
            console.log(id)
            const res = await fetch(`https://imdb-api.com/API/Reviews/${apiKey}/${id}`, {
                method : "GET",
                mode: 'cors',
            })
            const rs = await res.json()
            for(let i = 0; i < 3; i++){
                this.reviews.push(rs.items[i]);
            }
        },


        handleClickActorName(id){
            this.store.idActor = id;
            this.store.currentComponent = 'ActorDetail'
        }

    },

    mounted(){
        this.loadDetailMovie(this.store.idDetail);
        this.loadReviewMovie(this.store.idDetail);
        if(this.store.theme === 'dark'){
            $('.detail-movie').addClass('bg-dark')
            $('.detail-movie').removeClass('bg-light')
        }
        else{
            $('.detail-movie').addClass('bg-light')
            $('.detail-movie').removeClass('bg-dark')
        }
    },

    template: `
    <div class="detail-movie bg-light p-2 rounded-2 mt-4">
        <div class="row">
            <div class="col-4">
                <img
                    :src="details.image"
                    alt="details.id"
                    class="w-100"
                />
            </div>
            <div class="col-8">
                <p>Tên Phim: {{details.title}}</p>
                <p>Năm sản xuất: {{details.releaseDate}}</p>
                <p>Đạo diễn: {{details.directors}}</p>
                <p>Tóm Tắt: {{details.plot}}</p>
                <p>Diễn viên:
                    <span class="actor-link" v-for="(actor, index) in details.starList" @click="handleClickActorName(actor.id)">[{{actor.name}}]</span>
                </p>
                <p>Thể Loại: {{details.genres}}</p>
            </div>
        </div>
        <h4 class="mt-4 mb-3">Reviews</h4>
        <div class="row">
            <div class="col-12" v-for="(review,index) in reviews">
                <p>username: {{review.username}}</p>
                <p>content: {{review.content}}</p>
                <span class="py-4 d-block"></span>
            </div>
        </div>
    </div>
    `
}

export default MovieDatail