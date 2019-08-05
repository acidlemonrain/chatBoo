<template>
  <div class="container">
    <div class="d-flex">
      <div class="row">
        <b-col sm="12" md="4">
          <div class="card">
            <div class="card-title">Lorem ipsum dolor sit.</div>
            <p
              class="card-text"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis cumque fugiat velit repellat provident vel accusantium atque sed, repudiandae, saepe laborum corporis.</p>
          </div>
        </b-col>
      </div>
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
.card {
  width: 100%;
  height: 100%;
}
</style>
