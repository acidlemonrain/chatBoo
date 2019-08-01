<template>
  <b-container>
    <b-row class="wrap">
      <b-col sm="12" md="6">
        <b-button @click="login=false">登录</b-button>
        <b-button @click="login=true">注册</b-button>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-row>
          <b-card v-if="!login">
            <b-form>
              <b-form-group label="username" label-for="xx">
                <b-input placeholder="username" required v-model="form.username" id="xx"></b-input>
              </b-form-group>
              <b-form-group label="password" label-for="xxx">
                <b-input
                  placeholder="password"
                  type="password"
                  required
                  v-model="form.password"
                  id="xxx"
                ></b-input>
              </b-form-group>
              <b-button @click="auth">login</b-button>
            </b-form>
          </b-card>

          <b-card v-if="login">
            <b-form @submit="submit">
              <b-form-group label="nickname" label-for="i0">
                <b-input placeholder="nickanme" required v-model="form.nickname" id="i0"></b-input>
              </b-form-group>

              <b-form-group label="username" label-for="i1">
                <b-input placeholder="username" required v-model="form.username" id="i1"></b-input>
              </b-form-group>

              <b-form-group label="password" label-for="i2">
                <b-input
                  placeholder="password"
                  required
                  v-model="form.password"
                  type="password"
                  id="i3"
                ></b-input>
              </b-form-group>

              <b-form-group label="repassword" label-for="i3">
                <b-input
                  placeholder="password"
                  required
                  v-model="form.repassword"
                  type="password"
                  id="i3"
                ></b-input>
              </b-form-group>

              <b-button type="submit">register</b-button>
            </b-form>
          </b-card>
        </b-form-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      login: false,
      form: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      if (this.form.password == this.form.repassword) {
        this.$http
          .post("user", this.form)
          .then(res => {
            alert(JSON.stringify(res.data));
          })
          .catch(e => {
            alert(JSON.stringify(e));
          });
      }
    },
    //登录
    auth(evt) {
      this.$http.post("user/login", this.form).then(res => {
        localStorage.setItem("user", res.data);
        this.$store.commit("auth", res.data);
        this.$router.push("home");
      });
    }
  }
};
</script>

<style>
.wrap {
  flex-wrap: wrap;
}
</style>
