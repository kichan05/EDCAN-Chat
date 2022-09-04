import {createStore} from "vuex"
import {db} from "@/firebase";
import {collection, getDocs } from "firebase/firestore";

const store = createStore({
    state() {
        return {
            userName: null,
            userId : null,
            chatDataList : [],
            userData : null,
            token : null,
        }
    },
    getters: {
        getUserName: function (state) {
            return state.userName
        },
        getUserId: function (state) {
            return state.userId
        },
        getChatDataList(state){
            return state.chatDataList
        },
        getUserData(state){
            return state.userData
        },
        getToken(state){
            return state.token
        },
    },
    mutations: {
        setUserName(state, name) {
            return state.userName = name
        },
        setUserId(state, id) {
            return state.userId = id
        },
        addCharData(state, chatData) {
            chatData["timeStamp"] = new Date(chatData["timeStamp"].seconds * 1000)
            state.chatDataList.push(chatData)
        },
        setUserData(state, userData) {
            state.userData = userData
        },
        setToken(state, token) {
            state.token = token
        },
    },
    actions: {
        async getChatDataFirebase(state) {
            const chatData = await getDocs(collection(db, "chat"));

            chatData.forEach(doc => {
                const data = doc.data()
                state.commit("addCharData", data)
                // console.log(data)
            })
        }
    }
})

export default store;