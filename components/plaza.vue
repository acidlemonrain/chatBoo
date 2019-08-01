<template>
  <b-container>
    <h5>好友广场</h5>
    <div>
      <b-row class="wrap">
        <b-col v-for="user in users" :key="user.id" md="4" sm="6">
          <div class="my-3">
            <b-link :to="'/userhome/'+user.userid">
              <img
                :src="'http://localhost:8989/user/avatars/'+user.avatar"
                width="40px"
                height="40px"
                style="object-fit: cover;"
                v-b-tooltip.hover
                :title="user.des"
              />
            </b-link>
            {{user.nickname}}
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      users: []
    };
  },
  created() {
    this.$http
      .get("friend")
      .then(res => {
        this.users = res.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
</style>
