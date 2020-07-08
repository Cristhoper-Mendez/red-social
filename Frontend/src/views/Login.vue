<template>
    <div >
        <h1>Login</h1>
        <b-alert
            class="my-2"
            :show="dismissCountDown"
            dismissible
            :variant="mensaje.color"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            {{mensaje.texto}}   
        </b-alert>
        <form @submit.prevent="login()">
            <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
            <input type="password" placeholder="Password" class="form-control my-2" v-model="user.password">
            <b-button class="btn-block btn-info" type="submit">Login</b-button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";

export default {
    name: 'Login',
    data(){
        return{
            mensaje: {color: 'danger', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            user: {email: '', password:''}
        }
    },
    methods:{
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        login(){
            this.axios.post('/login', this.user)
                .then(res => {
                    console.log(res.data);
                    const token = res.data.token;
                    this.saveUser(token)
                    this.$router.push({name: 'Profile'})
                }).catch(e => {
                    this.mensaje.color = 'danger'
                    this.mensaje.texto = e.response.data.message
                    this.showAlert()
                });
        },
        ...mapActions(['saveUser']),
    
    }
}
</script>