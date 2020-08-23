<template>
  <div class="container">
    <Modal />
    <div class="card" style="background-color: #C0C0C0;">
      <div class="card-header" style="background-color: #8d9db6;">
        <h3 class="card-title text-white">
          <b-icon-image class></b-icon-image>Upload an image
        </h3>
      </div>
      <div class="card-body">
        <form method="POST" @submit.prevent="sendPost(post)">
          <div class="form-group">
            <b-form-file
              @change="processFile($event)"
              v-model="image"
              :state="Boolean(file)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Title for the image"
              required
              v-model="post.title"
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              class="form-control"
              rows="2"
              placeholder="Description for the image"
              required
              v-model="post.description"
            ></textarea>
          </div>
          <div class="form-group" v-if="err">
            <h4>{{ err }}</h4>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="file === null" v-b-modal.modal-tall>
              <b-icon-cloud-upload class></b-icon-cloud-upload>Upload Image
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header text-white" style="background-color: #8d9db6;">
        <h3>
          <BIconImageAlt></BIconImageAlt>Recents uploads
        </h3>
      </div>

      <div class="album py-2 bg-light">
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { BIconImage, BIconCloudUpload, BIconImageAlt } from "bootstrap-vue";
import Modal from "@/components/Modal";
import Stats from "@/components/Stats";
import router from "../router";
export default {
  name: "Home",
  components: {
    BIconImage,
    BIconCloudUpload,
    BIconImageAlt,
    Modal,
    Stats,
  },
  data() {
    return {
      err: null,
      image: [],
      file: null,
      CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/djy2hxzcz/upload",
      CLOUDINARY_UPLOAD_PRESET: "zpmmi49a",
      resCloud: {},
      posts: [],
      post: {},
      cargar: false,
      isOpen: false,
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    ...mapActions(["getStats", "getPopular", "getComments"]),
    getPosts() {
      this.axios
        .get("/images")
        .then((response) => {
          this.posts = response.data.images;
          this.getStats(response.data.sidebar.stats);
          this.getPopular(response.data.sidebar.popular);
          this.getComments(response.data.sidebar.comments);
          // console.log(response.data.sidebar);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    processFile(event) {
      console.log(this.image);
      const typeFile = event.target.files[0].type;
      if (typeFile === "image/jpeg" || typeFile === "image/png") {
        this.image = event.target.files[0];
        this.err = null;
        this.file = true;
      } else {
        this.err = "Invalid file";
        this.image = [];
        this.file = null;
        return;
      }
    },
    async sendPost(item) {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.cargar = true;

      let formData = new FormData();
      formData.append("file", this.image); // le damos los datos de la imagen luego que se lleno en la funcion processFile()
      formData.append("upload_preset", this.CLOUDINARY_UPLOAD_PRESET); // le damos nuestro preset
      formData.append("folder", "Posts");

      //subiendo imagen con fetch
      fetch(this.CLOUDINARY_URL, { method: "POST", body: formData })
        .then((response) => response.json()) //convertimos la respuesta en json
        .then((data) => (this.post.fileName = data.url))
        .then(() => {
          this.axios
            .post("/newImage", item, config)
            .then((res) => {
              this.posts.unshift(res.data);
              router.push({ name: "ViewImage", params: { id: res.data._id } });
            })
            .catch((e) => {
              console.log(e).response.data.error.errors.name.message;
            });
        }) // obtenemos la url de la imagen guardada
        .catch((error) => console.log("ocurrio un error ", error)); //capturamos un posible error
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>