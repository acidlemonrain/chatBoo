<template>
  <b-container>
    <b-row>
      <b-col md="5" sm="12">
        <b-card :class="{pink:info.sex=='Female',blue:info.sex=='Male'}">
          <figure>
            <img
              :src="'http://106.15.183.147:8989/user/avatars/'+info.avatar"
              width="80%"
              height="200px"
              style="object-fit: cover;"
            />
          </figure>

          <div class="d-flex justify-content-between align-items-center">
            昵称：
            <div>{{info.nickname}}</div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            个人简介：
            <div>{{info.des}}</div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            性别：
            <div>{{info.sex}}</div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            好友数量
            <div>{{info.friend | leng}}</div>
          </div>

          <hr />
          <div>
            <b-form v-if="is" tag="friendmodel">
              <b-form-group>
                <b-input placeholder="消息" v-model="content"></b-input>
                <b-button @click="send">发送</b-button>
              </b-form-group>
            </b-form>
            <b-button v-if="isadd" @click="is=!is">添加他为好友</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col md="7" sm="12">
        <hr />
        <h5>他的动态</h5>
        <div v-for="blog in info.blogs" :key="blog.id">
          <b-card class="content mb-3">
            <div v-if="blog.content.length>250">{{blog.content|head}}...</div>
            <div v-else>{{blog.content }}</div>
            <div class="text-right">{{blog.gen|local}}</div>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      is: false,
      info: {}
    };
  },
  filters: {
    head: value => {
      return value.substring(0, 250);
    },
    local: x => {
      return new Date(x).toLocaleString();
    },
    leng: value => {
      if (value) {
        return value.length;
      } else {
        return "error";
      }
    }
  },
  methods: {
    send() {
      this.$http
        .post("friend", {
          active: this.user.userid,
          passive: this.id,
          content: this.content
        })
        .then(res => {
          this.$bvToast.toast(` `, {
            title: "已发送",
            solid: true
          });
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user || localStorage.getItem("user");
    },
    id() {
      return this.$route.params.id;
    },
    isadd() {
      // const b1 = !!this.user.friend; //要在线
      // const b2 = this.id != this.user.userid; //不是自己
      // const b3 = !this.user.friend.find(e => {
      //   return e.userid == this.id;
      // }); //不在好友列表里面
      return (
        !!this.user.friend &&
        this.id != this.user.userid &&
        !this.user.friend.find(e => {
          return e.userid == this.id;
        })
      );
    }
  },
  mounted() {
    this.$http.get("user/userhome/" + this.id).then(res => {
      this.info = res.data;
      console.log(this.info);
    });
  }
};
</script>

<style>
.pink {
  background-color: rgba(255, 182, 193, 0.384);
}
.blue {
  background-color: rgba(173, 216, 230, 0.397);
}
</style>
