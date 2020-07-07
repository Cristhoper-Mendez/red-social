<template>
  <div>
    <h1> <b-avatar variant="primary" size="4rem" v-if="this.userDB.data.avatar == ''"></b-avatar> My Profile {{this.userDB.data.name}}</h1>
    <b-avatar v-if="this.userDB.data.avatar != ''" size="4rem" :src="this.userDB.data.avatar"></b-avatar>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="(item, index) of posts" :key="index">
            <div
              class="card border-primary mb-3"
              style="max-width: 18rem; background-color: #8d9db6;"
            >
              <div class="card-body text-dark">
                <h5 class="card-title text-center">{{ item.title }}</h5>
                <router-link :to="{ name: 'ViewImage', params: { id: item._id } }">
                  <b-img :src="item.fileName" class="w-100 h-100 img-thumbnail"></b-img>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data(){
      return{
          posts: [],
         
      }
  },
  created(){
      this.getPosts();
  },
  methods:{
      getPosts(){
          let config = {
              headers: {
                  token: this.token
              }
          }

          // this.axios.get('profile', config)
          //   .then(res => {
          //       this.posts = res.data
          //   }).catch(e => {
          //       console.log(e);
          //   });
          this.axios.get('profile', {headers:{
            token: this.token
          }})
            .then(res => {
                this.posts = res.data
            }).catch(e => {
                console.log(e);
            });
      }
  },
  computed:{
      ...mapState(['token', 'userDB'])
  }
};
</script>