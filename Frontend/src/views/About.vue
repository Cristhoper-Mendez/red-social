<template>
  <div class="card">
    <div class="card-header text-center" style="background-color: #8d9db6;">
      <h1>I'm Cristhoper Mendez</h1>
    </div>
    <div class="card-body" style="background-color: #C0C0C0;">
      <h2 class="text-center">Full Stack Developer</h2>
      <br />

      <div class="container">
        <div class="row">
          <div class="col-md-6" v-for="(tecnologie, index) in tecnologies" :key="index">
            <div class="servicesBx especial">
              <img :src="tecnologie.img" class="w-100 h-100 img-thumbnail" />
              <h2>{{tecnologie.name}}</h2>
              <p>{{tecnologie.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer" style="background-color: #8d9db6;">
      <a
        class="btn btn-primary"
        target="_blank"
        href="https://github.com/Cristhoper-Mendez"
      >My GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "About Me",
  data() {
    return {
      tecnologies: [
        {
          name: "JavaScript",
          description: "Web development with JavaScript",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
        },
        {
          name: "Node.js",
          description:
            "Backend development using Node.js, Express.js and ECMAScript",
          img:
            "https://cdn3.altiria.com/wp-content/uploads/2017/03/node-logo.jpg",
        },
        {
          name: "Vue.js",
          description: "Development of modern applications - Single Page App ",
          img: "https://i.imgur.com/scrcyJ3.png",
        },
        {
          name: "React",
          description:
            "Frontend development using the most popular library of JavaScript",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
        },
      ],
    };
  },
};
</script>
