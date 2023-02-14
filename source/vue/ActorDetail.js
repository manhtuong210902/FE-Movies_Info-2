import MovieCard from "./MovieCard.js"
import store from "../store/store.js"
import { apiKey } from "../constants/index.js"

const ActorDetail = {
    data(){
        return{
            store,
            details: {},
            actors: [],
            actorsShowPage: [],
            currPage: 1,
            numberOfPage: 0,
        }
    },

    methods: {
        async loadDetailActor(id){
            console.log(id)
            const res = await fetch(`https://imdb-api.com/en/API/Name/${apiKey}/${id}`, {
                method : "GET",
                mode: 'cors',
            })
            const rs = await res.json()
            this.details = rs;
            this.actors = this.details.knownFor;
            this.actorsShowPage = []
            this.numberOfPage = Math.ceil(this.actors.length / 6);
            let n = this.actors.length <= 6 ? this.actors.length : 6;
            for(let i = 0; i < n; i++){
                this.actorsShowPage.push(this.actors[i]);
            }
        },

        handleChangePage(event, index){
            event.preventDefault();
            const pageActiveBtn = $(".page-item.active");
            if(Number(index) == this.currPage){
                return
            }

            this.currPage = Number(index);
            const listPageItem = $(".page-item");
            const pageSelectedBtn = listPageItem.get(Number(index)-1);
            pageActiveBtn.removeClass('active');
            pageSelectedBtn.classList.add('active');
            this.actorsShowPage = this.actors.slice(6 * (Number(index) - 1), 6 * (Number(index) - 1) + 6);
        }
    },

    mounted(){
        this.loadDetailActor(this.store.idActor)
        if(this.store.theme === 'dark'){
            $('.detail-actor').addClass('bg-dark')
            $('.detail-actor').removeClass('bg-light')
        }
        else{
            $('.detail-actor').addClass('bg-light')
            $('.detail-actor').removeClass('bg-dark')
        }
    },

    components: {
        MovieCard,
    },

    template: `
        <div class="detail-actor bg-light p-2 rounded-2 mt-4">
            <div class="row">
                <div class="col-4">
                    <img
                        :src="details.image"
                        alt=""
                        class="w-100"
                    />
                </div>
                <div class="col-8">
                    <p>Tên diễn viên: {{details.name}}</p>
                    <p>Tiểu sử: {{details.summary}}</p>
                </div>
            </div>
            <h4 class="mt-4 mb-3">KnownFor</h4>
            <div class="row">
                <MovieCard v-for="(movie, index) in actorsShowPage" :data="movie"/>
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

export default ActorDetail