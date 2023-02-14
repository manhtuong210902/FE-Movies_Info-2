import ListMoive from './ListMovie.js'
import Banner from './Banner.js'

const Content = {
    data() {
        return{
          
        }
    },

    components: {
        Banner,
        ListMoive,
    },

    methods: {
       
    },

    template: `

        <!-- banner -->
        <div class="row">
            <div class="col-12">
                <Banner />
            </div>
        </div>

        <!-- content -->
        <div class="row">
            <div class="col-12">
                <div class="content mt-3">
                    <ListMoive :type="'popular-movie'"/>
                    <ListMoive :type="'top-rate'"/>
                </div>
            </div>
        </div>  
    `
}

export default Content