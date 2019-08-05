<template>
  <b-container>
    <b-modal ref="my-modal" ok-only>修改成功</b-modal>
    <b-row class="center">
      <b-col sm="12" md="6">
        <b-card>
          <figure>
            <img :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar" alt width="90px" />
          </figure>
          <div class="large-12 medium-12 small-12 cell">
            <label>
              File
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
            </label>
            <button class="btn btn-primary" @click="submitFile()">file</button>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6">
        <b-card>
          <b-form-row>
            <b-form>
              <b-form-group label-cols label="nickname">
                <b-input v-model="form.nickname"></b-input>
              </b-form-group>
              <b-form-group label-cols label="des">
                <b-input v-model="form.des"></b-input>
              </b-form-group>
              <b-form-group label-cols label="sex">
                <b-form-radio-group v-model="form.sex" :options="options" name="radio-inline"></b-form-radio-group>
              </b-form-group>
              <b-button @click="basicinfo">confirm</b-button>
            </b-form>
          </b-form-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      file: "",
      form: {},
      options: [{ text: "男", value: "Male" }, { text: "女", value: "Female" }]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.form = this.user;
  },
  methods: {
    //修改名字 性别
    basicinfo() {
      this.$http
        .post("user/prof", { ...{ userid: this.user.userid }, ...this.form })
        .then(res => {
          this.$refs["my-modal"].show();
          let user = { ...this.user };
          user.nickname = form.nickname;
          user.sex = this.form.sex;
          user.des = this.form.des;
          this.$store.commit("auth", { ...user });
        });
    },
    //修改头像
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();
      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);
      /*
          Make the request to the POST /single-file URL
        */
      this.$http
        .post("user/upload/" + this.user.userid, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let user = { ...this.user };
          user.avatar = res.data;
          this.$store.commit("auth", { ...user });
          alert("修改成功");
        })
        .catch(function(e) {
          console.log(e);
        });
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style scoped>
.center {
  justify-content: center;
}
</style>
