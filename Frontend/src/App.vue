<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #9fa9a3;">   
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <b-nav-item :to="{name: 'Home'}" >
            <img src="./assets/imgshare-logo.png" id="Image" :to="{name: 'Home'}">
          </b-nav-item>
          <b-nav-item :to="{name: 'About'}" exact>
            Home
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <b-nav-item :to="{name: 'Profile'}" exact>
            Profile
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <a class="nav-item nav-link" href="#">Nose we xd</a>
          <b-nav-item to="/login" v-if="!isActive">Login</b-nav-item>
          <b-nav-item to="/notes" v-if="isActive" @click="logout()">Logout</b-nav-item>
        </div>
      </div>
    </nav>
    <div class="container p-4 " >
      <div class="row">
        <div class="col-md-8">
          <router-view />
        </div>
        <div class="col-md-4">
          <Stats />
          <Popular/>
          <Comments/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#Image {
  width: 100px;
  height: 25px;
}
</style>
<script>
import Stats from "@/components/Stats";
import Popular from "@/components/Popular";
import Comments from "@/components/Comments";

import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    Stats,
    Popular,
    Comments
  },
  methods: {
    ...mapActions(['logout', 'readToken'])
  },
  computed:{
    ...mapGetters(['isActive'])
  },
  created(){
    this.readToken();
  }

}
</script>