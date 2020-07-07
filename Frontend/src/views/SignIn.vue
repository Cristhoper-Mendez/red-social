<template>
    <div >
        <h1>Sign In</h1>
        <h1>Login</h1>
        <form @submit.prevent="login">
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
export default {
    name: 'SignIn'
}
</script>