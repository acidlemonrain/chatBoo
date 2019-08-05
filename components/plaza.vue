<template>
  <b-container>
    <div>
      <b-row class="wrap">
        <b-col v-for="user in freshmen" :key="user.id" md="4" sm="6">
          <div class="my-3">
            <b-link :to="'/userhome/'+user.userid">
              <img
                :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar"
                width="40px"
                height="40px"
                style="object-fit: cover;"
                v-b-tooltip.hover
                :title="user.des "
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
  computed: {
    freshmen() {
      return this.users.sort((a, b) => {
        return a.gen < b.gen;
      });
    }
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
