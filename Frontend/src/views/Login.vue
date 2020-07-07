<template>
    <div >
        <h1>Login</h1>
        <form @submit.prevent="login()">
            <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
            <input type="password" placeholder="Password" class="form-control my-2" v-model="user.password">
            <b-button class="btn-block btn-info" type="submit">Login</b-button>
        </form>
        <div v-if="message != ''" class="my-2">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";

export default {
    name: 'Login',
    data(){
        return{
            message: '',
            user: {email: '', password:''}
        }
    },
    methods:{
        login(){
            this.axios.post(`/login`, this.user)
                .then(res => {
                    console.log(res.data);
                    const token = res.data.token;
                    this.saveUser(token)
                    this.$router.push({name: 'Profile'})
                }).catch(err => {
                    console.log(e.response.data.error.errors.name.message);
                });
        },
        ...mapActions(['saveUser']),
    
    }
}
</script>