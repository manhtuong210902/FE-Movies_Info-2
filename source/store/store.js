const { reactive } = Vue;
const store = reactive(
    {
        theme: 'light',
        currentComponent: 'Content',
        idDetail : null,
        idActor: null,
        searchValue: '',
    }
)

export default store