<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #8d9db6;">   
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
            <img src="../assets/imgshare-logo.png" id="Image" :to="{name: 'Home'}">
          </b-nav-item>
          <b-nav-item :to="{name: 'Home'}" exact>
            Home
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <b-nav-item :to="{name: 'Profile'}" exact>
            Profile
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <!-- <a class="nav-item nav-link" href="#">About Me</a> -->
          <b-nav-item :to="{name: 'About'}" exact>
            About Me
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <b-nav-item to="/login" v-if="!isActive">Login</b-nav-item>
          <b-nav-item to="/notes" v-if="isActive" @click="logout()">Logout</b-nav-item>
        </div>
      </div>
    </nav>
    </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
    name: 'Navbar',
    methods: {
    ...mapActions(['logout'])
  },
  computed:{
    ...mapGetters(['isActive'])
  },
  
}
</script>