<template>
  <header>
    <nav>
      <nuxt-link class="text-blue-700" to="/">Home</nuxt-link>
      <nuxt-link v-if="!token" class="text-blue-700" to="sign-up"
        >Sign Up</nuxt-link
      >
      <nuxt-link v-if="!token" class="text-blue-700" to="login"
        >Log In</nuxt-link
      >
      <nuxt-link v-if="token" class="text-blue-700" to="/dashboard"
        >Dashboard</nuxt-link
      >
      <nuxt-link
        v-if="token"
        class="text-blue-700"
        to="/"
        @click.native="userLogout"
        >Log Out</nuxt-link
      >
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      token: (state) => state.authToken
    })
  },
  methods: {
    ...mapActions(['userLogout'])
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
