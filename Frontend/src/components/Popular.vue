<template>
    <div class="card mb-2">
        <div class="card-header text-white" style="background-color: #8d9db6;">
            <h5> <BIconArrowUp/> Most popular</h5>
        </div>
        <div class="row">
          <div class="col-md-4"  v-for="item in sidebarPopular" :key="item.id">
            <router-link :to="{ name: 'ViewImage', params: { id: item._id } }">
              <b-img :src="item.fileName" class="w-100 h-100 img-thumbnail"></b-img>
            </router-link>
          </div>
        </div>
    </div>
   
</template>
<script>
import { mapState } from "vuex";
import { BIconArrowUp } from "bootstrap-vue";

export default {
    name: 'Popular',
    data(){
        return{
            
        }
    },
    components:{
        BIconArrowUp
    },
    computed:{
        ...mapState(['sidebarPopular'])
    }
}
</script>