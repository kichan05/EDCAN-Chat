<template>
<div class="page">
  <header>
    <img src="@/assets/edcan.svg">
    <h1>EDCAN Chat</h1>
  </header>

  <main>
    <div class="chat-list">
      <ChatItemOther></ChatItemOther>
    </div>
    <div class="chat-input-wrap">
      <input type="text" placeholder="채팅을 입력하세요.">
      <button>
        <img src="@/assets/send_icon.svg">
      </button>
    </div>
  </main>
</div>
</template>

<script>
import ChatItemOther from "@/components/ChatItemOther"

export default {
  name: "ChatPage",
  components : {
    ChatItemOther
  }

}
</script>

<style scoped>
.page {
  display: flex;
}

header {
  height: 72px;
  padding: 19px 12px;

  display: flex;
  align-items: center;

  position: fixed;
  top : 0px;
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
  flex : 1;

  display: flex;
  flex-direction: column;

  padding: 72px 12px 16px;
}

.chat-list {
  flex: 1;
}

.chat-input-wrap {
  display: grid;
  grid-template-columns: 1fr auto;
  gap : 8px;
}

.chat-input-wrap button {
  display: flex;
  align-items: center;
}

</style>