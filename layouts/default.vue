<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark" fixed="top" height="80px">
        <b-navbar-nav>
          <b-nav-item :to="'/chat'">聊天室</b-nav-item>
          <b-nav-item :to="'/blog'">动态</b-nav-item>

          <b-nav-item-dropdown text="用户" right>
            <b-dropdown-item :to="'/login'">账户</b-dropdown-item>
            <b-dropdown-item :to="'/home'" v-if="(typeof user.userid )  ">我的主页</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <img
            :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar"
            height="40px"
            width="40px"
            style="object-fit: cover;"
          />
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class style="margin-top:80px"></div>

    <nuxt />
  </div>
</template>
<script>
import "~/plugins/vue-inject.js";
import "~/plugins/axios.js";

export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

 