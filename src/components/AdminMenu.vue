<template>
<div class="modal" @click.self="$emit('close')">

  <nav>
    <h3>관리자 메뉴</h3>

    <div class="chat-data">
      <div>보낸사람 : {{ chatData.user }} ({{ chatData.userEmail }}) </div>
      <div class="chat-msg">내용 : {{ chatData.msg }} </div>
      <div>보낸 시간 : {{ chatData.timeStamp }} </div>
      <div>채팅 Id : {{ chatData.id }} </div>
    </div>

    <button @click="deleteMessage">메시지 삭제하기</button>

  </nav>

</div>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore"
import {db} from "@/firebase";

export default {
  name: "AdminMenu",
  props : {
    chatData: Object
  },
  methods : {
    async deleteMessage(){
      const docRef = doc(db, "chat", this.chatData.id)

      await updateDoc(docRef, {
        del : true,
      })

      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.modal {
  width : 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.33);

  position: fixed;
  top : 0px;
  left : 0px;
}

.modal nav {
  width: 100%;
  max-width: 700px;

  background-color: #fff;

  border-radius: 1em;
  padding: 20px;

  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal nav h3 {
  font-size: 20px;
}

.modal nav .chat-data {
  font-size: 18px;

  padding: 12px;
}

.modal nav .chat-data * {
  margin-top : 8px;

  color: #949494;
}


.modal nav .chat-data .chat-msg {
  color: #00b8d4;
  font-size: 20px;
}

nav button {
  font-size: 18px;

  margin-top: 24px;
}


</style>