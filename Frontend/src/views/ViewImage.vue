<template>
  <div>
    <div style="background-color: #C0C0C0;" class="card" >
      
      <div 
        style="background-color: #8d9db6;"
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h2 class="mx-auto title">{{ post.title }}</h2>
        <b-button
          variant="danger"
          @click="deletePost"
          v-if="userDB != '' && post.userId === userDB.data._id"
        >
          Delete
          <BIconTrash2 />
        </b-button>
      </div>
      <div class="card-body">
        <p class="text-center description">{{ post.description }}</p>
        <div class="text-center">
          <b-img :src="post.fileName" class="img-fluid"></b-img>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <b-button v-if="this.liked === false" variant="success" @click="postLike()">
          Like
          <BIconHandThumbsUp />
        </b-button>

        <b-button v-if="this.liked === true" variant="success" @click="postLike()">
          Dislike
          <BIconHandThumbsUp />
        </b-button>
        
        <p>
          <span>
            {{ likes }}
            <BIconHeartFill />
          </span>
        </p>
        <p>
          {{ post.views }}
          <BIconEyeFill />
        </p>
        <p>
          {{ timeAgo(post.timeStamp) }}
          <BIconClockHistory />
        </p>
      </div>
    </div>
    <div class="card mt-2" style="background-color: #C0C0C0;">
      <div class="card-body" v-if="this.token === ''">
        <span>Inicia sesion para poder comentar</span>
      </div>
      <div class="card-body" v-if="this.token != ''">
        <b-navbar toggleable>
          <h1>
            Comments
            <BIconChatSquareDotsFill />
          </h1>
          <b-navbar-toggle target="navbar-toggle-collapse" style="background-color: #8d9db6;">
            <template v-slot:default="{ expanded }">
              <small>Write a comment</small>
              <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
              <b-icon v-else icon="chevron-bar-down"></b-icon>
            </template>
          </b-navbar-toggle>

          <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <form method="POST" @submit.prevent="sendComment(comment)">
                <div class="form-group">
                  <textarea
                    class="form-control"
                    name="10"
                    rows="2"
                    placeholder="Write a comment"
                    v-model="comment.comment"
                  ></textarea>
                </div>
                <div class="form-group">
                  <b-button variant="primary" type="submit">Send</b-button>
                </div>
              </form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="card-body">
        <ul class="list-group p-4" v-for="(comment, index) in comments" :key="index">
          <li class="list-group-item">
            <div class="row">
              <b-avatar variant="primary" v-if="comment.avatar == ''" class="mx-auto"></b-avatar>
              <b-avatar
                v-if="comment.avatar != ''"
                size="4rem"
                :src="comment.avatar"
                class="mx-auto"
              ></b-avatar>
              <blockquote class="col">
                <p class="lead">{{comment.comment}}</p>
                <footer class="blockquote-footer">{{comment.name}} - {{timeAgo(comment.timeStamp)}}</footer>
              </blockquote>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.title,
.description{
  text-transform: capitalize;
}
</style>

<script>
import router from "../router";
import { mapState } from "vuex";
import moment from "moment";
import {
  BIconTrash2,
  BIconHandThumbsUp,
  BIconHeartFill,
  BIconEyeFill,
  BIconClockHistory,
  BIconBook,
  BIconHeart,
  BIconChatSquareDotsFill,
} from "bootstrap-vue";
export default {
  name: "ViewImage",
  components: {
    BIconTrash2,
    BIconHandThumbsUp,
    BIconHeartFill,
    BIconEyeFill,
    BIconClockHistory,
    BIconBook,
    BIconHeart,
    BIconChatSquareDotsFill,
  },
  data() {
    return {
      image_id: this.$route.params.id,
      post: {},
      likes: "",
      comment: {},
      comments: [],
      liked: false
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    deletePost() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      const res = confirm("Delete?");
      if (res) {
        this.axios
          .delete(`/images/${this.image_id}`, config)
          .then((result) => {
            console.log(result);
            router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    postLike() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .post(`/images/${this.image_id}/like`, this.liked, config)
        .then((result) => {
          // console.log(result.data.likeDb.like);
          this.likes = result.data.postDB.likes;
          this.liked = result.data.likeDB.like;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPost(id) {

      this.axios
        .get(`/images/${this.image_id}`)
        .then((result) => {
          this.post = result.data.postDB;
          this.likes = result.data.postDB.likes;
          this.comments = result.data.commentDB;
          console.log(result);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    timeAgo(timeStamp) {
      return (timeStamp = moment(timeStamp).startOf("minute").fromNow());
    },
    sendComment() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.comment.fileName = this.post.fileName;

      this.axios
        .post(`/images/${this.image_id}/comment`, this.comment, config)
        .then((res) => {
          console.log(res.data);
          this.comments.unshift(res.data);
          this.comment = {};
        })
        .catch((e) => {
          console.log(e.response.data.error.errors.name.message);
        });
    },
  },
  computed: {
    ...mapState(["token", "userDB"]),
  },
}
</script>