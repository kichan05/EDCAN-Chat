<template>
  <div class="page">
    <div class="input-wrap">
      <h1 class="title">환영합니다<br>자신의 별명을 입력해주세요.</h1>

      <img src="@/assets/welcome.svg" class="welcome-image">

      <div class="meg">별명은 채팅방에서 보이는<br>자신의 이름 입니다.</div>

      <div class="name-input-wrap">
        <input type="text" placeholder="이름을 입력해주세요" v-model="inputName" class="input-name">
      </div>

      <p class="error-message"
         :class="{'animation' : errorMessageAnimation}"
         v-if="errorMessage != ''"
         @dblclick="adminLogin"
      >{{ errorMessage }}</p>

    </div>

    <div class="goto-button-wrap">
      <p>Google 로그인을 통해서 접속하게 됩니다.</p>
      <button @click="join">접속 하기</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"
import {auth, provider,} from "@/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export default {
  name: "welcomePage",
  data() {
    return {
      inputName: "",
      errorMessage: "",
      errorMessageAnimation: false,
      loginClick: 0
    }
  },
  computed: {
    ...mapGetters(["getUserName", "getUserEmail" , "getIsAdmin"]),
  },
  methods: {
    ...mapMutations(["setUserName", "loginUser"]),
    join() {
      if (this.inputName === "") {
        this.errorMessageAnimation = true

        setTimeout(() => {
          this.errorMessageAnimation = false
        }, 2000)

        this.errorMessage = "이름을 입력해주세요."
        return
      }

      signInWithPopup(auth, provider)
          .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            let userData = result.user
            userData["userName"] = this.inputName

            this.$store.commit("setUserName", userData["userName"])
            this.$store.commit("setUserEmail", userData["email"])
            this.$store.commit("setToken", token)

            this.$router.push({"name" : "chat"})
          })
    },
    adminLogin() {
      if (this.loginClick == 2)
        this.$router.push({'name': 'admin login'})
      else
        this.loginClick += 1
    }
  },
  mounted() {
    console.log(this.getUserData)
  }
}
</script>

<style scoped>
.page {
  padding: 32px 32px 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

* {
  text-align: center;
}

input {
  text-align: start;
}

.title {
  font-size: 32px;
}

.welcome-image {
  width: 30%;

  margin-top: 10px;
}

.meg {
  font-size: 28px;

  margin-top: 24px;
}

.input-name {
  margin-top: 28px;
}

.goto-button-wrap {


  /*position: absolute;*/
  /*left: 32px;*/
  /*right: 32px;*/
  /*bottom: 32px;*/
}

.goto-button-wrap p {
  color: #8c8c8c;
  font-size: 20px;
  font-weight: 500;

  margin-bottom: 12px;
}

.goto-button-wrap button {
  max-width: 500px;
}

.error-message {
  color: #fc3e3e;
  font-size: 24px;
  font-weight: 600;

  margin-top: 20px;
}

.error-message.animation {
  animation-name: error-message;
  animation-duration: 1000ms;
  animation-timing-function: ease-in-out;
}

@keyframes error-message {
  0%, 56% {
    transform: translateX(-7%);
  }
  28%, 86% {
    transform: translateX(7%);
  }
  100% {
    transform: translateX(0%);
  }
}

</style>