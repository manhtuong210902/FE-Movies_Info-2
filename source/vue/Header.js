import store from "../store/store.js"

const Header = {
    data(){
        return{
            store,
        }
    },

    methods: {
        handleClickToggleTheme(){
            $('body').toggleClass('bg-secondary bg-black')
            $('.container-fluid, .alert, .navbar').toggleClass('text-dark text-light')
            $('.navbar').toggleClass('navbar-light navbar-dark')
            $('.detail-movie, .detail-actor, .navbar, .alert').toggleClass('bg-light bg-dark')
            if(this.store.theme === 'light'){
                this.store.theme = 'dark'
            }else{
                this.store.theme = 'light'
            }
        }
    },

    template: `
    <header>
        <div
            class="alert alert-light bg-light d-flex justify-content-between align-items-center text-dark"
            role="alert"
        >
            <p>20120619</p>
            <h4>Movies Info</h4>
            <div class="header_more">
                <p>k_fhrdkaex</p>
                <div class="form-check form-switch d-flex align-items-center gap-1" @click="handleClickToggleTheme">
                    <input class="form-check-input" type="checkbox" id="switchDarkMode" />
                    <label class="form-check-label" for="switchDarkMode">Dark mode</label>
                </div>
            </div>
        </div>
    </header>
    `
}

export default Header