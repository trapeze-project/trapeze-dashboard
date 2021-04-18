<template>
  <div>
    <h1 class="title">
      Setup
    </h1>
    <v-divider />
    <br>
    <v-alert
      v-model="alert.show"
      :type="alert.type"
      dismissible
    >
      {{ alert.msg }}
    </v-alert>
    <div class="setup-container">
      <v-list style="width: 60%">
        <br>
        <div>
          <v-subheader><b>THEME</b></v-subheader>
          <v-divider />
          <div v-for="(item, key) in config.theme.light" :key="key">
            <PColorPicker v-model="config.theme.light[key]">
              {{ key+"-color" }}
            </PColorPicker>
          </div>
          <v-subheader><b>LOGO</b></v-subheader>
          <v-divider />
          <br>
          <v-text-field v-model="config.logo.url" label="Logo-Url" />
          <v-text-field
            v-model="config.logo.slogan"
            label="Slogan"
          />
        </div>
        <br>
        <v-btn style="float: right;" color="primary" @click="commitChanges">
          Save
        </v-btn>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/setup')
    return {
      config: result
    }
  },
  data: () => ({
    alert: {
      show: false,
      msg: '',
      type: 'success'
    }
  }),
  methods: {
    commitChanges () {
      this.$axios.put('/api/setup', this.config).then((result) => {
        this.alert.show = true
        this.alert.msg = 'Design changes have been changed'
        this.alert.type = 'success'
      }).catch((e) => {
        this.alert.show = true
        this.alert.msg = JSON.stringify(e)
        this.alert.type = 'error'
      })
    }
  }
}
</script>

<style scoped>
.setup-container {
  display: flex;
  justify-content: center;
}
.color-picker {
    display: absolute;
}
</style>
