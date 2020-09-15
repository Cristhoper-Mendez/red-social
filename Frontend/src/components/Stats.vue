<template>
    <div class="card mb-2">
        <div class="card-header text-white" style="background-color: #8d9db6;">
            <h5>Stats <BIconClipboardData /></h5>
        </div>
        <div class="card-body">
            <p> <BIconImages/> Images: {{sidebarStats.images}}</p>
            <p> <BIconChatDotsFill/> Comments: {{sidebarStats.comments}}</p>
            <p> <BIconHandThumbsUp/> Likes: {{sidebarStats.likes}} </p>
            <p> <BIconEyeFill/> Views: {{sidebarStats.views}} </p>
        </div>
    </div>
</template>

<script>
import { BIconClipboardData, BIconImages, BIconChatDotsFill, BIconHandThumbsUp, BIconEyeFill } from "bootstrap-vue";
import { mapState } from "vuex";
export default {
    name: 'Stats',
    components: {
        BIconClipboardData,
        BIconImages,
        BIconChatDotsFill,
        BIconHandThumbsUp,
        BIconEyeFill
    },
    computed:{
        ...mapState(['sidebarStats'])
    }
}
</script>