<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row class="column">
        <b-list-group>
          <b-list-group-item v-for="blog in blogs" :key="blog.id">
            {{blog.author}} :
            {{blog.content}}
          </b-list-group-item>
        </b-list-group>
      </b-row>
    </b-container>
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
      blogs: []
    };
  },
  //数据初始
  created() {
    this.$http.get("blog").then(res => {
      this.blogs = res.data;
    });
  }
};
</script>

<style  >
.column {
  flex-flow: column;
}
</style>
