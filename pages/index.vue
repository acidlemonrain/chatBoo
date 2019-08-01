<template>
  <div class="container">
    <div v-for="user in users" :key="user.id">
      <img
        :src="'http://localhost:8989/user/avatars/'+user.avatar"
        width="40px"
        height="40px"
        style="object-fit: cover;"
      />
      {{user.nickname}}
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  //数据
  data: () => {
    return {
      users: []
    };
  },
  //数据初始
  created() {
    this.$http.get("friend").then(res => {
      this.users = res.data;
    });
  }
};
</script>

<style  >
.column {
  flex-flow: column;
}
</style>
