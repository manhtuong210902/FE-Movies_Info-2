import Header from './Header.js'
import Navbar from './Navbar.js'
import Footer from './Footer.js'
import ListSearch from './ListSearch.js'
import Content from './Content.js'
import MovieDetail from './MovieDetail.js'
import ActorDetail from './ActorDetail.js'
import store from '../store/store.js'

const Main = {
    data() {
        return{
            store,
        }
    },

    components: {
        Header,
        Navbar,
        Footer,
        ListSearch,
        Content,
        MovieDetail,
        ActorDetail,
    },

    template: `
    <div class="container-fluid text-dark">
        <!-- header -->
        <div class="row">
            <div class="col-12">
                <Header />
            </div>
        </div>

        <!-- navbar -->
        <div class="row">
            <div class="col-12">
                <Navbar />
            </div>
        </div>

        <component :is="store.currentComponent" :searchValue="store.searchValue"/>

        <!-- footer -->
        <div class="row">
            <div class="col-12">
                <Footer />
            </div>
        </div>
    </div>
    `
}

export default Main