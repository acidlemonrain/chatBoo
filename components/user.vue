<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Tab 1" active>
          <div>
            <b-card-title>我的动态</b-card-title>
            <b-list-group>
              <li v-for="blog in blogs" :key="blog.id">{{blog.content|head}}</li>
            </b-list-group>
            <hr />
            <b-button>创建动态</b-button>
          </div>
        </b-tab>
        <b-tab title="Tab 2">
          <b-card-title>我的好友</b-card-title>
          <b-list-group>
            <b-list-group-item v-for="f in user.friend" :key="f.id">
              <b-link :to="'userhome/'+f.userid">
                <img
                  :src="'http://106.15.183.147:8989/user/avatars/'+f.avatar"
                  height="40px"
                  width="40px"
                  style="object-fit: cover;"
                />
              </b-link>
              {{f.nickname}} {{f.username}}
            </b-list-group-item>
          </b-list-group>
          <b-button>寻找好友</b-button>
        </b-tab>
        <b-tab title="好友邀请">
          <b-list-group-item v-for="f in fNotify" :key="f.id">
            <div>
              {{f.content}}
              from: {{f.active}} {{f.status==false ? '未处理' :'已同意'}}
              <b-button
                class="ml-auto"
                v-if="f.status==false"
                @click="yes(f.active,f.passive,f.id)"
              >同意</b-button>
              <b-button @click="dismiss(f.id)">忽视</b-button>
            </div>
          </b-list-group-item>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user || localStorage.getItem("user");
    }
  },
  data: () => {
    return {
      blogs: [],
      fNotify: []
    };
  },
  filters: {
    head(value) {
      return value.substring(0, 300) + "...";
    }
  },
  created() {
    this.$http.get("blog/user/" + this.user.userid).then(res => {
      this.blogs = res.data;
    });
    this.$http.get("friend/" + this.user.userid).then(res => {
      console.log(res.data);

      this.fNotify = res.data;
    });
  },
  methods: {
    yes(a, p, id) {
      this.$http.post("friend/add", { active: a, passive: p }).then(res => {
        console.log(res.data);
        this.$store.commit("addF", res.data);
        this.fNotify.find(x => {
          return x.id == id;
        }).state = true;
      });
    },
    dismiss(id) {
      this.$http.get("friend/dismiss/" + id).then(res => {
        this.fNotify = this.fNotify.filter(x => {
          return x.id !== id;
        });
      });
    }
  }
};
</script>

<style>
</style>
