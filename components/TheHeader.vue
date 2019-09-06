<template>
  <header>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link v-if="!token" to="sign-up">Sign Up</nuxt-link>
      <nuxt-link v-if="!token" to="login">Log In</nuxt-link>
      <nuxt-link v-if="token" to="/dashboard">Dashboard</nuxt-link>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      token: (state) => state.authToken
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}
nav {
  height: 50px;
  text-align: right;
  padding: 0 5%;

  a {
    color: #597024;
    font-size: 18px;
    line-height: 50px;
    font-weight: 700;
    display: inline-block;
    margin: 0 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
