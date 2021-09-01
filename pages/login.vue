<template>
  <div>
    <v-alert v-model="loginAlert" type="error" dismissible>
      <!-- TODO: ADD TO TRANSLATION -->
      Username or password is wrong.
    </v-alert>
    <v-sheet
      elevation="3"
      max-width="600px"
      min-width="360px"
      class="center-vert"
    >
      <div class="text-h4 primary--text text-center pt-4">
        {{ $t('login.loginTitle') }}
      </div>
      <br>
      <div class="text-center d-flex flex-column align-center justify-center">
        <div>
          Please use your <strong> Finder </strong> credentials  to log in.
        </div>
        <div style="width: 150px" class="">
          <v-select :items="['Finder GmbH']" menu-props="auto" value="Finder GmbH" />
        </div>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="userLogin"
      >
        <v-row class="pl-3 pr-3">
          <v-col cols="12" class="pl-5 pr-5">
            <v-text-field v-model="login.username" :rules="usernameRules" color="primary" :label="$t('login.username')" required />
          </v-col>
          <v-col cols="12" class="pl-5 pr-5">
            <v-text-field
              v-model="login.password"
              color="primary"
              required
              :rules="passwordRules"
              type="password"
              :label="$t('login.password')"
            />
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="9" xsm="12" />
          <v-col class="d-flex" align-end cols="12" sm="1" xsm="12">
            <v-btn block color="primary" elevation="4" type="submit">
              {{ $t('login.login') }}
            </v-btn>
          </v-col>

          <v-col cols="12" class="text-caption text-center">
            <v-divider />
            <br>
            If you don't know your Finder credentials please use the application to <a href="www.google.com">reset your password</a>.
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data: () => ({
    loginAlert: false,
    valid: true,
    login: {
      username: '',
      password: ''
    },
    usernameRules: [
      // TODO: ADD TO TRANSLATION
      v => !!v || 'Username is required'
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    passwordRules: [
      // TODO: ADD TO TRANSLATION
      v => !!v || 'Password is required'
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ]

  }),
  layout () {
    return 'start'
  },
  methods: {

    async userLogin () {
      if (this.$refs.form.validate()) {
        try {
          await this.$auth.loginWith('cookie', { data: this.login })
        } catch (err) {
          this.loginAlert = true
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }
      }
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
