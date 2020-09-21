<template>
  <div id="app" >
    <Navbar />
    <div class="container p-4 " >
      <div class="row">
        <div class="col-md-8">
          <router-view />
        </div>
        <div class="col-md-4">
          <Stats v-bind:stats={stats} />
          <Popular v-bind:popular={popular} />
          <Comments v-bind:comments={comments} />
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
/* #app {
  background: #ccc;
} */

</style>
<script>
import Stats from "@/components/Stats";
import Popular from "@/components/Popular";
import Comments from "@/components/Comments";
import Navbar from "@/components/Navbar";

import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  data() {
    return {
      comments: [],
      popular: [],
      stats: {},
    }
  },
  components: {
    Stats,
    Popular,
    Comments,
    Navbar
  },
  mounted(){
    this.getStats();
  },
  methods: {
    ...mapActions(['readToken']),
    getStats(){
      this.axios.get("/images/stats")
        .then((result) => {
          // console.log(result.data.sidebar);
          this.comments = result.data.sidebar.comments
          this.popular = result.data.sidebar.popular
          this.stats = result.data.sidebar.stats
          // console.log(this.stats);
        }).catch((err) => {
          console.log(err);
        });
    }
  },
  created(){
    this.readToken();
  }

}
</script>