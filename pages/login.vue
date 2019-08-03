<template>
  <b-container>
    <b-row class="wrap justify-content-center">
      <b-col sm="12" md="4">
        <b-card v-if="!login" width="100%">
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
            <b-form-group>
              <b-link class="float-right" @click="login=!login">还没有账号？点击注册</b-link>
            </b-form-group>
          </b-form>
        </b-card>

        <b-card v-if="login">
          <div v-if="success" class>
            <div class="alert alert-success" role="alert">注册成功~</div>
            <b-button block @click="login=false;success=false">点击登录</b-button>
          </div>

          <b-form @submit="submit" v-if="!success">
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
          <b-link class="float-right" @click="login=!login">返回登录</b-link>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      login: false,
      form: {},
      success: false
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
            if (res.data == false) {
              alert("该账号已经注册");
            }
            if (res.data == true) {
              this.success = true;
            }
          })
          .catch(e => {
            alert(JSON.stringify(e));
          });
      } else {
        alert("两次密码不一样");
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
