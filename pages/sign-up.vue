<template>
  <div class="container mx-auto">
    <h1 class="text-center my-8 text-5xl text-blue-900">Sign Up</h1>

    <form class="text-center" @submit.prevent="signUpSubmit">
      <fieldset class="my-4">
        <input
          v-model="firstName"
          name="firstName"
          class="w-3/5 border-blue-900 border-solid border rounded-sm p-1 hover:border-blue-700 focus:border-blue-700 outline-none h-8"
          type="text"
          placeholder="First Name"
        />
      </fieldset>
      <fieldset class="my-4">
        <input
          v-model="lastName"
          name="lastName"
          class="w-3/5 border-blue-900 border-solid border rounded-sm p-1 hover:border-blue-700 focus:border-blue-700 outline-none h-8"
          type="text"
          placeholder="Last Name"
        />
      </fieldset>
      <fieldset class="my-4">
        <input
          v-model="email"
          name="email"
          class="w-3/5 border-blue-900 border-solid border rounded-sm p-1 hover:border-blue-700 focus:border-blue-700 outline-none h-8"
          type="email"
          placeholder="Email"
        />
      </fieldset>
      <fieldset class="my-4">
        <input
          v-model="password"
          name="password"
          class="w-3/5 border-blue-900 border-solid border rounded-sm p-1 hover:border-blue-700 focus:border-blue-700 outline-none h-8"
          type="password"
          placeholder="Password"
        />
      </fieldset>
      <fieldset>
        <button
          type="submit"
          class="rounded-sm px-6 py-2 text-lg bg-blue-900 text-white hover:bg-blue-700 font-bold"
        >
          Submit
        </button>
      </fieldset>
    </form>
    <loading :active.sync="isLoading" :is-full-page="true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    signUpSubmit() {
      this.isLoading = true
      this.$axios
        .post(`${process.env.API_URL}auth/register`, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .then((response) => {
          this.results = response.data
          if (response.data === 'success') {
            // user was created,
            // now make sure they are logged in
            this.$axios
              .post(`${process.env.API_URL}auth/login`, {
                email: this.email,
                password: this.password
              })
              .then((response) => {
                if (response.data.token) {
                  this.userLogin(response.data)

                  // logged in. redirect to dashboard
                  this.$router.push('/dashboard')
                  this.isLoading = false
                }
              })
              .catch((e) => {
                this.results = e.data
              })
          }
        })
    }
  }
}
</script>
