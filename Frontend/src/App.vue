<template>
  <div id="app" >
    <Navbar />
    <div class="container p-4 " >
      <div class="row">
        <div class="col-md-8">
          <router-view />
        </div>
        <div class="col-md-4">
          <Stats />
          <Popular />
          <Comments />
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
import Navbar from "@/components/Navbar";

import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    Stats,
    Popular,
    Comments,
    Navbar
  },
  methods: {
    ...mapActions(['readToken'])
  },
  created(){
    this.readToken();
  }

}
</script>