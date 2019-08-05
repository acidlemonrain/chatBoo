<template>
  <b-container>
    <b-card v-if="is">
      <b-form @submit="submit">
        <b-form-group>
          <label for="textarea-small">Small:</label>
          <b-form-textarea
            id="textarea-small"
            size="sm"
            placeholder="Small textarea"
            v-model="form.content"
          ></b-form-textarea>
        </b-form-group>
        <b-button class="float-right" @click="is=!is">取消</b-button>
        <b-button class="float-right mx-3" type="submit">发表</b-button>
      </b-form>
    </b-card>

    <b-button @click="is=!is" v-if="(!is)&&(user.userid)">创建动态</b-button>

    <br />
    <hr />
    <br />

    <div class="mb-5" v-for="blog in blogs" :key="blog.id">
      <figure>
        <b-link :to="'userhome/'+blog.author.userid">
          <img
            :src="'http://106.15.183.147:8989/user/avatars/'+blog.author.avatar"
            alt
            width="60px"
            height="60px"
            style="border-radius:50%;object-fit:cover"
          />
        </b-link>
        {{blog.author.nickname}}
      </figure>

      <div class="content">
        <div v-if="blog.content.length<=250">{{blog.content }}</div>

        <div v-if="blog.content.length>250">
          <div style="display:inline" v-if="blog.tag == false">{{blog.content| head}}.....</div>
          <div v-if="blog.tag == true">{{blog.content }}</div>
          <a
            class="small text-success"
            size="sm"
            @click="blog.tag=!blog.tag"
            style="cursor:pointer"
          >more</a>
        </div>
      </div>
      <div class="text-right">{{ blog.gen | local}}</div>
      <div style="cursor:pointer" @click="vote(blog.id)" class="float-right" pill>
        <font-awesome-icon icon="thumbs-up" />
        <b-badge variant="light">{{blog.vote}}</b-badge>
      </div>
      <hr />

      <b-button block @click="blog.iscom = (!blog.iscom)" variant="outline-primary">&#8628;</b-button>

      <div v-if="blog.iscom">
        <div v-for="com in blog.comments" :key="com.id">{{com.user.nickname}} : {{com.content}}</div>
        <b-form-group>
          <b-form-textarea size="sm" v-model="blog.comment"></b-form-textarea>
        </b-form-group>

        <b-button @click="comment(blog)" class="float-right mx-3" pill>评论</b-button>
      </div>
    </div>
    <b-button @click="loadblogs" pill v-if="blogload">加载更多</b-button>
    <b-spinner type="grow" label="Loading..." v-if="!blogload"></b-spinner>
  </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      blogload: false,
      page: 0,
      form: {},
      blogs: [],
      comments: [],
      is: false
    };
  },
  filters: {
    head: value => {
      return value.substring(0, 250);
    },
    local: x => {
      return new Date(x).toLocaleString();
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    //评论功能
    comment(blog) {
      this.$http
        .post("comment", {
          user: this.user.userid || 1,
          blog: blog.id,
          content: blog.comment
        })
        .then(res => {
          this.blogs
            .find(x => {
              return x.id === blog.id;
            })
            .comments.push({
              user: {
                nickname: this.user.nickname
              },
              content: res.data.content
            });
        });
    },
    //点赞功能
    vote(id) {
      this.$http.get("blog/vote/" + id).then(res => {
        if (res.data != false) {
          this.blogs.find(blog => {
            return blog.id == id;
          }).vote++;
        }
      });
    },
    //创建动态
    submit(evt) {
      evt.preventDefault();
      this.$http
        .post("blog", { author: this.user.userid, content: this.form.content })
        .then(res => {
          this.page = 0;
          this.blogs = [];
          this.loadblogs();
        });
    },
    loadcoms(addedblogs) {
      //加载对应的评论

      const commentids = [];
      addedblogs.forEach(blog => {
        commentids.push(blog.id);
      });
      //

      this.$http
        .post("comment/get", commentids)
        .then(res => {
          //
          const addedcomments = res.data;

          //遍历
          addedblogs.forEach(blog => {
            addedcomments.forEach(com => {
              if (com.blog === blog.id) {
                blog.comments.push(com);
              }
            });
          }); //遍历结束
          //合并blogs
          this.blogs = [...this.blogs, ...addedblogs];
          this.blogload = true;
        })
        .catch(e => {});
    },

    loadblogs() {
      //加载blog
      this.blogload = false;
      this.$http.get("blog/" + this.page).then(res => {
        res.data.forEach(element => {
          element.tag = false;
          element.iscom = false;
          element.comments = [];
        });
        this.page++;
        this.loadcoms(res.data);
        console.log(res.data);

        //
      });
    }
  },
  created() {
    this.loadblogs();
  }
};
</script>

<style>
</style>
