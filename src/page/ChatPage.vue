<template>
  <div class="page">
    <header>
      <div class="left">
        <img src="@/assets/edcan.svg">
        <h1>EDCAN Chat</h1>
      </div>
      <div class="right" v-if="getIsAdmin">
<!--        <span class="chat-delete" @click="chatDelete">채팅 기록 전체 삭제</span>-->
        <span class="logout" @click="logout">어드민 로그아웃</span>
      </div>
    </header>

    <main>
      <div class="chat-list-wrap">
        <div class="chat-list">

          <ChatItem
              v-for="i, n in chatDataList"
              :key="n"
              :chatData="i"
              :isMe="i.userEmail === getUserEmail"
          />
        </div>
      </div>

      <form class="input-field-wrap" @submit="sendMsg" action="" method="" onsubmit="return false">
        <div class="input-wrap">
          <input type="text" placeholder="채팅을 입력하세요" v-model="inputMsg">
        </div>
        <div class="send-button-wrap">
          <button class="send-btn" type="submit">
            <img src="@/assets/send_icon.svg" alt="">
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import ChatItem from "@/components/ChatItem"
import {db} from "@/firebase"
import {collection, addDoc, onSnapshot, orderBy, query, getDocs, updateDoc} from "firebase/firestore";
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: "ChatPage",
  data() {
    return {
      inputMsg: "",
      chatDataList: []
    }
  },
  computed: {
    ...mapGetters(["getUserName", "getToken", "getUserEmail", "getIsAdmin"]),
  },
  methods: {
    ...mapMutations(["setToken", "setUserUnAdmin"]),
    ...mapActions(["getChatDataFirebase"]),
    async sendMsg() {
      if (this.inputMsg === "") {
        alert("메시지를 입력해주세요.")
        return
      }

      const msg = this.inputMsg

      this.inputMsg = ""

      const chatRef = await addDoc(collection(db, "chat"), {
        "user": this.getUserName,
        "msg": msg,
        "timeStamp": new Date(),
        "del": false,
        "userEmail": this.getUserEmail,
      })

      console.log(`[Chat send success] ${chatRef.id}`)
    },
    logout() {
      const result = confirm("로그아웃 하시겠습니까?")

      if (result) {
        this.setUserUnAdmin()
      }
    },
    async chatDelete() {
      const result = confirm("전체 대이터를 삭제 하시겠습니까?")

      if (result) {
        const chatRef = collection(db, "chat")
        const docs = await getDocs(chatRef).then()

        docs.forEach((doc)=>{
          console.log(doc.data()["msg"])
          updateDoc(doc, {
            "del" : true,
          })
        })
      }
    }
  },
  components: {
    ChatItem
  },
  beforeMount() {
    console.log(this.getUserEmail)
    if (this.getUserName == null) {
      this.$router.push({"name": "welcome"})
    }
  },
  async mounted() {
    const chatRef = collection(db, "chat")
    const timeStampOrder = orderBy("timeStamp")

    const q = query(chatRef, timeStampOrder)

    onSnapshot(q, docs => {
      this.chatDataList.length = 0

      docs.forEach(doc => {
        let data = doc.data()

        data["id"] = doc.id
        data["timeStamp"] = new Date(data["timeStamp"].seconds * 1000)

        this.chatDataList.push(data)
      })

      setTimeout(() => {
        let chatListWrap = document.querySelector(".chat-list-wrap")
        chatListWrap.scroll(0, document.querySelector(".chat-list").scrollHeight)
      }, 10)
    })
  },
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
  justify-content: space-between;

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

header .left {
  display: flex;
  align-items: center;
}

header .right * {
  color: #00b8d4;
  font-size: 20px;
  font-weight: 700;

  margin-left: 12px;

  cursor: pointer;
}

header .right .chat-delete {
  color: #d40000;
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

.input-wrap input {
  font-size: 18px;
  padding: 12px;
}

.send-btn {
  display: flex;
  align-items: center;

  padding: 12px;
}

</style>