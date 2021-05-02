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
          <PSitePreview :preview-config="config" style="position: sticky; top: 100px;z-index: 10" />
          <br>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                THEME
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-for="(item, key) in config.theme.light" :key="key">
                  <PColorPicker v-model="config.theme.light[key]">
                    {{ key+"-color" }}
                  </PColorPicker>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                HEADER
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field v-model="config.logo.url" label="Logo-Url" />
                <v-text-field
                  v-model="config.logo.slogan"
                  label="Slogan"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                FOOTER
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <br>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                BACKGROUND
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field v-model="config.background.url" label="Background-Url" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <br>
          <v-btn style="float: right;" color="primary" @click="commitChanges">
            Save
          </v-btn>
        </div>
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
  computed: {
    cssVars () {
      return {
        '--url': 'url(' + this.$config.logo.url + ')'
      }
    }
  },
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
a {
    background-color: transparent;
    margin: 10px;
}

#logo {
    display: block;
    content: var(--url);
    max-height: 30px;
}

.header-preview {
    height: 60px;
    display: flex;
    flex-flow: row nowrap;
    justify-items: space-between;
    align-items: center;
}
</style>
