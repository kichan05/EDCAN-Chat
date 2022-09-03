<template>
  <div class="page">
    <header>
      <img src="@/assets/edcan.svg">
      <h1>EDCAN Chat</h1>
    </header>

    <main>
      <div class="chat-list-wrap">
        <div class="chat-list">

          <ChatItem
              v-for="i, n in chatDataList"
              :key="n"
              :chatData="i"
              :isMe="i.user === getUserName"
          />
        </div>
      </div>
      <div class="input-field-wrap">
        <div class="input-wrap">
          <input type="text" placeholder="채팅을 입력하세요" v-model="inputMsg">
        </div>
        <div class="send-button-wrap">
          <button class="send-btn" @click="sendMsg">
            <img src="@/assets/send_icon.svg" alt="">
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ChatItem from "@/components/ChatItem"
import { db } from "@/firebase"
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ChatPage",
  data() {
    return {
      inputMsg : "",
      chatDataList : []
    }
  },
  computed : {
    ...mapGetters(["getUserName", "getChatDataList", "getUserId"]),
  },
  methods: {
    ...mapActions(["getChatDataFirebase"]),
    async sendMsg() {
      if(this.inputMsg === ""){
        alert("메시지를 입력해주세요.")
        return
      }

      const msg = this.inputMsg

      this.inputMsg = ""

      const chatRef = await addDoc(collection(db, "chat"), {
        "user": this.getUserName,
        "userId" : this.getUserId,
        "msg": msg,
        "timeStamp": new Date(),
        "del" : false
      })

      console.log(`[Chat send success] ${chatRef.id}`)
    }
  },
  components: {
    ChatItem
  },
  beforeMount() {
    if(this.getUserId === null){
      this.$router.push({"name" : "welcome"})
    }
  },
  async mounted() {
    const chatRef = collection(db, "chat")
    const timeStampOrder = orderBy("timeStamp")
    // const delFilter = where("del", "==", false)

    const q = query(chatRef, timeStampOrder)

    onSnapshot(q, docs => {
      this.chatDataList.length = 0

      docs.forEach(doc => {
        let data = doc.data()
        data["timeStamp"] = new Date(data["timeStamp"].seconds * 1000)

        this.chatDataList.push(data)
      })
    })


    let chatListWrap = document.querySelector(".chat-list-wrap")
    chatListWrap.scroll(0, 100000000000000)
  }
}
</script>

<style scoped>
.page {

}

header {
  height: 72px;
  padding: 19px 12px;

  background: rgba(255, 255, 255, 0.61);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid #e8e8e8;

  display: flex;
  align-items: center;

  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
}

header img {
  width: 42px;
}

header h1 {
  font-size: 27px;
  font-weight: 500;

  margin-left: 16px;

  display: inline-block;
}

main {
  height: 100vh;

  padding-top: 72px;

  display: grid;
  grid-template-rows: 1fr auto;
}

.chat-list-wrap {
  overflow-y: scroll;
}

.chat-list-wrap::-webkit-scrollbar {
  background-color: transparent;
}

.chat-list-wrap::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: #A1A1A182;
  background-clip: padding-box;
  border: 3px solid transparent;
}

.chat-list-wrap::-webkit-scrollbar-track {

}

.chat-list {
  padding: 12px;
}

.input-field-wrap {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.send-btn {
  display: flex;
  align-items: center;
}

</style>