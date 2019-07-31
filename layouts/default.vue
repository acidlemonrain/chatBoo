<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark" fixed="top" height="80px">
        <b-navbar-nav>
          <b-nav-item :to="'/chat'">Home</b-nav-item>
          <b-nav-item :to="'/blog'">blog</b-nav-item>
          <b-nav-item :to="'/home'">myhome</b-nav-item>
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item :to="'/login'">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
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

 