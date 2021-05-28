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
    async userLogin () {
      /* const response = await this.$axios.$post('/auth/login', {
        username: 'henry',
        password: '12341234'
      })
      // eslint-disable-next-line no-console
      console.log(response)
      const response1 = await this.$axios.$get('https://test.backend.trapeze.raschke.cc/users')
      // eslint-disable-next-line no-console
      console.log(response1) */
      try {
        // use strategy cookie instead of local
        const response = await this.$auth.loginWith('cookie', { data: this.login }) 
        // eslint-disable-next-line no-console
        console.log(response)

        // retrieves all users now
        const response1 = await this.$axios.$get('/users')
        // eslint-disable-next-line no-console
        console.log(response1)
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
