<template>
  <v-sheet
    elevation="3"
    max-width="600px"
    min-width="360px"
    class="center-vert"
  >
    <div class="text-h4 primary--text text-center pt-4">
      {{ $t('login.loginTitle') }}
    </div>
    <v-form ref="form" @submit.prevent="userLogin">
      <v-row class="pa-3">
        <v-col cols="12">
          <v-text-field v-model="login.username" color="primary" :label="$t('login.username')" required />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="login.password"
            color="primary"
            required
            type="password"
            :label="$t('login.password')"
          />
          </v-text-field>
        </v-col>
        <v-spacer />
        <v-col cols="12" sm="9" xsm="12" />
        <v-col class="d-flex" align-end cols="12" sm="1" xsm="12">
          <v-btn block color="primary" elevation="4" type="submit">
            {{ $t('login.login') }}
          </v-btn>
        </v-col>
      </v-row>
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
  layout () {
    return 'start'
  },
  methods: {

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
<style scoped>
.center-vert {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    -o-transform:translate(-50%,-50%);
}
</style>
