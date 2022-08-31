<template>
<div class="page">
  <div class="input-wrap">

    <h1 class="title">환영합니다<br>자신의 별명을 입력해주세요.</h1>
    
    <img src="@/assets/welcome.svg" class="welcome-image">

    <div class="meg">별명은 채팅방에서 보이는<br>자신의 이름 입니다.</div>

    <div class="name-input-wrap">
      <input type="text" placeholder="이름을 입력해주세요" v-model="inputName" class="input-name">
    </div>

  </div>
  <div class="goto-button-wrap">
    <button @click="join">접속 하기</button>
  </div>
</div>
</template>

<script>
export default {
  name: "welcomePage",
  data(){
    return {
      inputName : ""
    }
  },
  methods : {
    join(){
      alert(this.inputName)
    }
  }
}
</script>

<style scoped>
.page {
  padding: 32px;

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
  width : 30%;

  margin-top: 10px;
}

.meg {
  font-size: 28px;

  margin-top: 24px;
}

.input-name {
  margin-top: 28px;
}

</style>