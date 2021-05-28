<template>
  <v-sheet
    elevation="3"
  >
    {{ $auth.user }}
    <v-form ref="form" @submit.prevent="userLogin">
      <v-text-field
        v-model="login.username"
        :counter="10"
        label="Username"
        required
      />

      <v-text-field
        v-model="login.password"
        label="Password"
        required
      />
      <v-btn
        class="mr-4"
        type="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>

export default {
  data: () => ({
    login: {
      username: '',
      password: ''
    }

  }),
  methods: {
    middleware: ['auth'],
    async userLogin () {
      try {
        // use strategy cookie instead of local
        await this.$auth.loginWith('cookie', { data: this.login })
        // eslint-disable-next-line no-console
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
    clear () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>
