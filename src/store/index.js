import {createStore} from "vuex"
import axios from "axios"

const store = createStore({
    state() {
        return {
            allFoods: [],
            user: undefined,
            admin: undefined,
            kitchen: undefined,
            deleteFood: [],
        }
    },
    mutations: {
        setFoodsData(state, payload){
            state.allFoods = payload;
        },
        setUser(state, payload){
            state.user = payload;
        },
        setAdmin(state, payload){
            state.admin = payload;  
        },
        setKitchen(state, payload){
            state.kitchen = payload;
        },
        deleteFood(state, foodId){
            state.allFoods = state.allFoods.filter((food) => food.food_id !== foodId);
        },
    },
    actions: {
        async getFoodsData(context){
            await axios.get('/foods')
            .then(function (response) {
                console.log(response);
                context.commit("setFoodsData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
})

export default store;