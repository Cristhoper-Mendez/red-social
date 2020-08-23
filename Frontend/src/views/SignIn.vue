<template>
    <div >
        <h1>Sign In</h1>
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
        <form @submit.prevent="signIn">
            <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
            <input type="password" placeholder="Password" class="form-control my-2" v-model="user.password">
            <input type="text" placeholder="User name" class="form-control my-2" v-model="user.name">
            <b-button class="btn-block btn-info" type="submit">Sign In</b-button>
        </form>
        <!-- <div v-if="message != ''" class="my-2">
            <p>{{message}}</p>
        </div> -->
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'SignIn',
    data(){
        return{
            user: {},
            mensaje: {color: 'danger', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
        }
    },
    methods:{
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        signIn(){
            console.log(this.user);
            this.axios.post('/newUser', this.user)
                .then(res => {
                    console.log(res.data);
                    const token = res.data.token;
                    this.saveUser(token)
                    this.$router.push({name: 'Profile'})
                }).catch(e => {
                    this.mensaje.color = 'danger'
                    this.mensaje.texto = e.response.data.error.message
                    this.showAlert()
                });
            
        },
        ...mapActions(['saveUser'])
    }
}
</script>