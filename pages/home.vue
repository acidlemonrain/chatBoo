<template>
  <b-container>
    <b-row class="column">
      <b-card>
        <b-row class="ja">
          <b-col md="5">
            <img :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar" alt width="100%" />
          </b-col>
          <b-col md="5">
            <b-card-title>我的信息表</b-card-title>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <h5>昵称：</h5>
                {{user.nickname}}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <h5>用户名：</h5>
                {{user.username}}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <h5>简介：</h5>
                {{user.des}}
              </b-list-group-item>
            </b-list-group>
            <hr />
            <b-button :to="'profile'">修改信息</b-button>
          </b-col>
        </b-row>
      </b-card>

      <br />
      <hr />
      <br />
      <user></user>
    </b-row>
  </b-container>
</template>

<script>
import user from "~/components/user.vue";
export default {
  components: {
    user
  },
  data: () => {
    return {
      blogs: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user || localStorage.getItem("user");
    }
  }
};
</script>

<style>
.column {
  flex-flow: column;
}
.ja {
  justify-content: space-around;
}
</style>
