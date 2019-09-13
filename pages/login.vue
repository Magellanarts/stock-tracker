<template>
  <div class="container mx-auto">
    <h1 class="text-center my-8 text-5xl text-pink-900">Log In</h1>

    <form class="text-center" @submit.prevent="loginSubmit">
      <fieldset class="my-4">
        <input
          v-model="email"
          name="email"
          class="w-3/5 border-pink-900 border-solid border rounded-sm p-1 hover:border-pink-700 focus:border-pink-700 outline-none h-8"
          type="email"
          placeholder="Email"
        />
      </fieldset>

      <fieldset class="my-4">
        <input
          v-model="password"
          name="password"
          class="w-3/5 border-pink-900 border-solid border rounded-sm p-1 hover:border-pink-700 focus:border-pink-700 outline-none h-8"
          type="password"
          placeholder="Password"
        />
      </fieldset>
      <fieldset>
        <button
          type="submit"
          class="rounded-sm px-6 py-2 text-lg bg-pink-900 text-white hover:bg-pink-700 font-bold"
        >
          Submit
        </button>
      </fieldset>
    </form>
    {{ results }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      results: ''
    }
  },
  middleware: 'notAuthenticated',
  methods: {
    loginSubmit() {
      // this.$auth
      //   .loginWith('local', {
      //     data: {
      //       email: this.email,
      //       password: this.password
      //     }
      //   })
      this.$axios
        .post(`${process.env.API_URL}auth/login`, {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          if (response.data.token) {
            this.results = response.data
            this.$store.dispatch('userLogin', response.data)
          }
        })
        .catch((e) => {
          console.log(e.response.data[0].message)
        })
    }
  }
}
</script>
