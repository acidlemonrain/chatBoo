<template>
  <b-container>
    <b-tabs content-class="mt-3">
      <b-tab title="好友广场">
        <plaza></plaza>
      </b-tab>
      <b-tab title="我的好友">
        <b-container>
          <div>
            <div v-if="chatWith==''">
              <div v-for="f in user.friend" :key="f.id">
                <div class="d-flex mb-3 align-items-center">
                  <img
                    :src="'http://106.15.183.147:8989/user/avatars/'+f.avatar"
                    width="40px"
                    height="40px"
                    style="object-fit:cover"
                  />
                  <div
                    class
                    v-if="online.includes(f.userid)"
                    style="color:green;cursor:pointer"
                    @click="chatWith=f.userid"
                  >
                    {{f.nickname}}
                    <b-badge variant="red">{{f.unread}}</b-badge>
                  </div>
                  <div class v-if="!online.includes(f.userid)" style="color:red">
                    {{f.nickname}}
                    <b-badge variant="red">{{f.unread}}</b-badge>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="chatWith!=''" style="position:relative ;width:100%">
              <div style="  background-color: rgba(86, 108, 126, 0.3); padding:5px">
                <div class="d-flex justify-content-between">
                  <user :user="target"></user>
                  <button type="button" class="close" aria-label="Close" @click="chatWith=''">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="msgContent" id="msg">
                <div v-for="(i,inx) in target.msgs" :key="inx">
                  <div v-bind:class="{ 'right': user.userid != i.chatWith  }" class="my-3">
                    <div>
                      <user :user="i"></user>
                    </div>
                    <div class="ml-4 d-inline-block px-3 mt-2 badge">{{ i.content}}</div>
                  </div>
                </div>
              </div>
              <b-form-group>
                <div class="d-flex">
                  <b-input v-model="msg"></b-input>
                  <b-button @click="send" class="float-right">send</b-button>
                </div>
              </b-form-group>
            </div>
          </div>
        </b-container>
      </b-tab>
    </b-tabs>

    <div style="display:none">{{ui}}</div>
  </b-container>
</template>

<script>
import io from "socket.io-client";
import user from "~/components/userlist.vue";
import plaza from "~/components/plaza.vue";
export default {
  components: {
    plaza,
    user
  },
  data: () => {
    return {
      ui: 0,
      chatWith: "",
      msg: "",
      socket: {},
      online: [],
      target: "",
      friends: []
    };
  },
  watch: {
    chatWith(to) {
      if (to != "") {
        this.target = this.friends.find(e => {
          return e.userid == to;
        });
        this.target.unread = "";
      }
    }
  },
  methods: {
    //聊天功能
    send() {
      const msg = {
        id: this.user.userid,
        author: this.user.nickname,
        content: this.msg,
        chatWith: this.chatWith,
        avatar: this.user.avatar
      };
      this.socket.emit("chat", msg, res => {
        if (res) {
          let target = this.friends.find(x => {
            return x.userid == msg.chatWith;
          });
          this.target.msgs.push(msg);
          this.msg = "";
          var element = document.getElementById("msg");
          setTimeout(() => {
            element.scrollTop = element.scrollHeight;
          }, 20);
        }
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user || localStorage.getItem("user");
    }
  },
  //初始
  mounted() {
    this.friends = this.user.friend.map(x => {
      let temp = x;
      temp.msgs = [];
      return temp;
    });

    this.socket = io("http://106.15.183.147:8989");
    this.socket.emit("auth", this.user);
    this.socket.on("init", res => {
      this.online = res;
    });
    //接受信息
    this.socket.on("chat", res => {
      this.ui++;
      let target = this.friends.find(x => {
        return x.userid == res.id;
      });
      if (!!target.userid && target.userid === res.id) {
        var element = document.getElementById("msg");
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 20);
      }
      if (!target.userid || target.userid != this.target.userid) {
        if (target.unread && target.unread != "") {
          target.unread++;
          this.ui++;
        } else {
          target.unread = 1;
          this.ui++;
        }
      }
      target.msgs.push(res);
    });
  },
  destroyed() {
    this.socket.disconnect();
  }
};
</script>

 
<style  >
.right {
  text-align: right;
  color: black;
}
.msgContent {
  padding: 1rem;
  height: 60vh;
  overflow-y: scroll;
  background-color: rgba(86, 108, 126, 0.671);
}
</style>
