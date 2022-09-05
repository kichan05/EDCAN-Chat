import {createStore} from "vuex"
import {db} from "@/firebase";
import {collection, getDocs } from "firebase/firestore";

const store = createStore({
    state() {
        return {
            userName: sessionStorage.getItem("userName"),
            userEmail : sessionStorage.getItem("userEmail"),
            token : sessionStorage.getItem("token"),

            isAdmin : false,
        }
    },
    getters: {
        getUserName: function (state) {
            return state.userName
        },
        getUserEmail: function (state) {
            return state.userEmail
        },
        getToken(state){
            return state.token
        },
        getIsAdmin(state){
            return state.isAdmin
        },
    },
    mutations: {
        setUserName(state, name) {
            sessionStorage.setItem("userName", name)
            console.log("userName 저장됨 : " + name)
            return state.userName = name
        },
        setUserEmail(state, email) {
            sessionStorage.setItem("userEmail", email)
            console.log("userEmail 저장됨 : " + email)

            return state.userEmail = email
        },
        setToken(state, token) {
            sessionStorage.setItem("token", token)
            console.log("token 저장됨 : " + token)
            state.token = token
        },

        loginAdmin(state, inputPassword){
            state.isAdmin = inputPassword === process.env.VUE_APP_ADMIN_LOGIN_PASSWORD
        },
        setUserAdmin(state) {
            state.isAdmin = true
        },
        setUserUnAdmin(state) {
            state.isAdmin = false
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