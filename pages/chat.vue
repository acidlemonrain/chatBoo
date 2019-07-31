<template>
  <b-container>
    <div style="display:none">{{ui}}</div>
    <b-row>
      <b-col md="9" v-if="chatWith!=''">
        to : {{target.nickname}}
        <div v-for="(i,inx) in target.msgs" :key="inx">
          <div v-bind:class="{ right: user.userid == i.chatWith  }">
            <figure>
              <img
                :src="'http://106.15.183.147:8989/user/avatars/'+i.avatar"
                width="40px"
                height="40px"
                style="object-fit: cover;"
              />
              <span v-bind:class="{ right: user.userid == i.chatWith  }">{{i.author}}:</span>
            </figure>
            <div>{{i.content}}</div>
          </div>
        </div>
        <b-form-group>
          <b-input v-model="msg"></b-input>
          <b-button @click="send">send</b-button>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <h5>我的好友</h5>

        <ul>
          <li v-for="f in user.friend" :key="f.id">
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
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import io from "socket.io-client";
export default {
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
      this.target = this.friends.find(e => {
        return e.userid == to;
      });
      this.target.unread = "";
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

<style>
.right {
  text-align: right;
  color: lightcoral;
}
</style>
