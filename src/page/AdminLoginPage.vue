<template>
<div class="page">

  <main>
    <input type="password" placeholder="비밀번호를 입력하세요." v-model="inputPassword">
    <button @click="login">로그인</button>
    <p v-if="loginFailCount > 0">로그인에 실패셨습니다.<br>5회 실패시 IP접속을 방지합니다. ( {{ loginFailCount }} / 5 )</p>
  </main>

</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AdminLoginPage",
  data(){
    return {
      inputPassword : "",
      loginFailCount : 0,
    }
  },
  computed : {
    ...mapGetters(["getIsAdmin"]),
  },
  methods : {
    ...mapMutations(["loginAdmin"]),
    login(){
      this.loginAdmin(this.inputPassword)

      if(this.getIsAdmin){
        this.$router.push({ "name" : "chat" })
      }
      else {
        this.loginFailCount += 1
      }
    }
  }
}
</script>

<style scoped>

main {
  position: fixed;
  top : 50%;
  left : 50%;
  transform: translate(-50%, -50%);
}

main button {
  margin-top: 20px;
}

main p {
  color: #ff3030;
  font-size: 20px;
  text-align: center;

  margin-top: 20px;
}

</style>