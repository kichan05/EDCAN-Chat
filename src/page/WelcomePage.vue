<template>
  <div class="page">
    <div class="input-wrap">
      <h1 class="title">환영합니다<br>자신의 별명을 입력해주세요.</h1>

      <img src="@/assets/welcome.svg" class="welcome-image">

      <div class="meg">별명은 채팅방에서 보이는<br>자신의 이름 입니다.</div>

      <div class="name-input-wrap">
        <input type="text" placeholder="이름을 입력해주세요" v-model="inputName" class="input-name">
      </div>

      <p class="error-message" :class="{'animation' : errorMessageAnimation}" v-if="errorMessage != ''">{{ errorMessage }}</p>

    </div>

    <div class="goto-button-wrap">
      <button @click="join">접속 하기</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import {v4 as uuidv4} from "uuid"

export default {
  name: "welcomePage",
  data() {
    return {
      inputName: "",
      errorMessage : "",
      errorMessageAnimation : false
    }
  },
  computed : {
    ...mapGetters(["getUserName"]),
  },
  methods: {
    ...mapMutations(["setUserName", "setUserId"]),
    join() {
      if(this.inputName === ""){
        this.errorMessageAnimation = true

        setTimeout(()=>{
          this.errorMessageAnimation = false
        }, 2000)

        this.errorMessage = "이름을 입력해주세요."
        return
      }

      let myUuid = uuidv4()
      this.setUserId(myUuid)

      this.setUserName(this.inputName)
      this.$router.push({name: 'chat'})
    }
  }
}
</script>

<style scoped>
.page {
  padding: 32px;
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
  position: fixed;
  left: 32px;
  right: 32px;
  bottom: 32px;
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
  animation-duration: 2000ms;
  animation-timing-function: ease-in-out;
}

@keyframes error-message {
  0%, 56% {
    transform: translateX(-5%);
  }
  28%, 86% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(0%);
  }
}

</style>