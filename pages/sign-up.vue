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
    {{ results }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      results: ''
    }
  },
  methods: {
    signUpSubmit() {
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
            // take them to their user page
            this.$router.push('login')
          }
        })
    }
  }
}
</script>

<style></style>
