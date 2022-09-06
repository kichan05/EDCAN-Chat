<template>
  <div class="chat-item" v-if="!chatData.del"
       :class="{'me' : isMe, 'other' : !isMe}">
    <div class="name-wrap">
      <span class="name">{{ chatData.user }}</span>
    </div>
    <div class="msg-wrap">
      <div class="msg" @dblclick="adminClick">{{ chatData.msg }}</div>
      <span class="time-stamp">
        {{ chatData.timeStamp.getHours() }}시 {{ chatData.timeStamp.getMinutes() }}분
      </span>
    </div>
  </div>
  <AdminMenu v-if="openAdminMenu" :chatData="chatData" @close="openAdminMenu = false"/>
</template>

<script>
import {mapGetters} from "vuex";
import AdminMenu from "@/components/AdminMenu";

export default {
  name: "ChatItem",
  data(){
    return {
      openAdminMenu : false
    }
  },
  components : {
    AdminMenu,
  },
  props: {
    chatData: Object,
    isMe: Boolean,
  },
  computed : {
    ...mapGetters(["getIsAdmin"]),
  },
  methods : {
    adminClick(){
      if(!this.getIsAdmin){
        return
      }

      this.openAdminMenu = true
    }
  }
}
</script>

<style scoped>
.name-wrap {
  margin-top: 12px;
}

.name-wrap .name {
  font-size: 14px;
  font-weight: 500;
}

.msg-wrap {
  margin-top: 4px;

  display: flex;
  align-items: flex-end;
}

.msg-wrap .msg {
  max-width: 300px;

  color: white;
  font-size: 15px;
  font-weight: 500;

  padding: 12px;

  display: inline-block;
}

.msg-wrap .time-stamp {
  color: #787878;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;

  margin-bottom: 8px;
}


.chat-item.other .msg-wrap .msg {
  background-color: #455A64;
  border-radius: 0px 15px 15px 15px;
}

.chat-item.me .msg-wrap .msg {
  background-color: #00b8d4;
  border-radius: 15px 0px 15px 15px;
}


.chat-item.me .msg-wrap {
  flex-direction: row-reverse;
}

.chat-item.me .name-wrap {
  text-align: right;
}

.chat-item.other .msg-wrap .time-stamp {
  margin-left: 7px;
}

.chat-item.me .msg-wrap .time-stamp {
  margin-right: 7px;
}
</style>