import store from '../store/store.js'

const Navbar = {
    data(){
        return{
            inputValue: '',
            store,
        }
    },

    methods: {
        handleClickSearch(){
            let value = this.inputValue
            if(!value.trim()){
                return;
            }
            this.store.currentComponent = 'ListSearch'
            this.store.searchValue = value
            document.querySelector('input[type=search]').value = "";
        },

        handleClickHome(){
            this.store.currentComponent = 'Content'
            this.store.searchValue = ''
        }
    },

    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" @click="handleClickHome">Home</a>
            <div class="d-flex">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    v-model="inputValue"
                />
                <button class="btn btn-outline-success" @click="handleClickSearch">Search</button>
            </div>
        </div>
    </nav>
    `
}

export default Navbar