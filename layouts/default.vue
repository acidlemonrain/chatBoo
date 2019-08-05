<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark" fixed="top" height="80px">
        <b-navbar-nav>
          <b-navbar-brand :to="'/'">Home</b-navbar-brand>
          <b-nav-item :to="'/blog'">动态</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/login'" class="ml-auto" v-if="!( user.userid )  ">账户</b-nav-item>
          <b-nav-item-dropdown right v-if=" ( user.userid )  ">
            <template slot="button-content">
              <img
                :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar"
                height="20px"
                width="20px"
                style="object-fit: cover;"
              />
            </template>
            <b-dropdown-item :to="'/login'" v-if="(!user.userid)">账户</b-dropdown-item>
            <b-dropdown-item :to="'/home'" v-if="( user.userid )  ">我的主页</b-dropdown-item>

            <b-dropdown-item :to="'/chat'" v-if="( user.userid )  ">聊天室</b-dropdown-item>
            <b-dropdown-item @click="logout" v-if="( user.userid )  ">
              <font-awesome-icon icon="sign-out-alt" />注销
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class style="margin-top:80px"></div>

    <nuxt />
  </div>
</template>
<script>
import Vue from "vue";
import "~/plugins/vue-inject.js";
import "~/plugins/axios.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faSignOutAlt,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faSignOutAlt, faThumbsUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.commit("auth", {});
      this.$router.push("login");
    }
  }
};
</script>

 