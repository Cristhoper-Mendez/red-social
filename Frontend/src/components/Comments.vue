<template>
    <div class="card mt-2" v-if="sidebarComments">
        <div class="card-header text-white" style="background-color: #8d9db6;">
            <h5> <BIconClock /> Latest comments</h5>
        </div>
        <div class="card-body">
            <div class="row" v-for="(item, index) in sidebarComments" :key="index">
                <div class="col">
                    <router-link :to="{ name: 'ViewImage', params: { id: item.imageId } }">
                        <b-img :src="item.fileName" class="w-100 h-100 img-thumbnail"></b-img>
                    </router-link>
                </div>
                <div class="col">
                    <blockquote class="w-100">
                        <p>{{item.comment}}</p>
                        <footer class="blockquote-footer">
                            <span>{{item.name}}   </span>
                            <span>{{timeAgo(item.timeStamp)}}</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { BIconClock } from "bootstrap-vue";
import moment from "moment";

export default {
    name: 'Comments',
    components: {
        BIconClock
    },
    computed:{
        ...mapState(['sidebarComments'])
    },
    methods:{
        timeAgo(timeStamp){
        return timeStamp = moment(timeStamp)
            .startOf("minute")
            .fromNow();
    }
    }
}
</script>