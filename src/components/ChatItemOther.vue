<template>
  <div class="chat-item other">
    <div class="name-wrap">
      <span class="name">박희찬</span>
    </div>
    <div class="msg-wrap">
      <div class="msg">대충 채팅 내용대충 채팅 내용대충 채팅 내용대충 채팅 내용대충 채팅 내용대충 채팅 내용대충 채팅 내용대충 채팅 내용</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
}
</script>

<style scoped>
.name-wrap .name {
  font-size: 14px;
  font-weight: 500;
}

.msg-wrap {
  max-width: 350px;

  color : white;
  background-color: #455A64;

  border-radius: 0px 12px 12px 12px;

  padding: 8px 16px;

  margin-top: 4px;

  display: inline-block;
}

.msg-wrap .msg {
  font-size: 15px;
  font-weight: 500;
}
</style>