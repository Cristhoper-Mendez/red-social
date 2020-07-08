<template>
  <div>
    <h1>  Welcome {{this.userDB.data.name}}</h1>
    <div class="mx-auto">
      <b-avatar variant="primary" size="4rem" v-if="this.userDB.data.avatar == ''"></b-avatar>
      <b-avatar v-if="this.userDB.data.avatar != ''" size="4rem" :src="this.userDB.data.avatar"></b-avatar>
    </div>
    <div class="album py-5 bg-light" v-if="this.posts.length != 0">
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
    <div class="">
      <b-alert show variant="warning my-4">Parece que aun no has publicado nada</b-alert>
      <!-- <h1 v-if="this.posts.length == 0"><A>Parece que aun no has publicado nada </A></h1> -->
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
                console.log(res.data);
                
                console.log(this.posts);
                
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