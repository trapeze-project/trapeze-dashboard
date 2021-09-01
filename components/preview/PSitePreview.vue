<template>
  <v-sheet elevation="5">
    <v-app-bar style="z-index: 1" clipped-left :color="previewConfig.theme.light.coporate">
      <v-app-bar-nav-icon color="secondary" />
      <v-spacer />
      <div class="d-flex flex-row flex-nowrap justify-space-between align-center" style="height:60px; width: 100%">
        <a id="logo" :style="cssVars" />
        <v-spacer />
        <b :style="'color:'+ previewConfig.theme.light['secondary']+';margin:10px;'" class="secondary--text d-none d-md-inline d-lg-inline"> {{ previewConfig.logo.slogan.toUpperCase() }} </b>
      </div>
      <v-spacer />
    </v-app-bar>
    <div style="width:100%;margin:0;padding:0">
      <v-col style="margin:0;padding:0" cols="7" sm="6" lg="4" xl="4">
        <v-list nav dense clipped :color="previewConfig.theme.light.accent">
          <v-list-item-group v-model="group" :color="previewConfig.theme.light.primary">
            <v-list-item v-for="(link, index) in links" :key="index" :to="localePath(link.to)" exact>
              <v-list-item-icon>
                <v-icon>
                  {{ link.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('links.'+link.label) }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    previewConfig: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    links: [
      { label: 'home', icon: 'home' },
      { label: 'profile', icon: 'account_circle' },
      { label: 'about', icon: 'business' },
      { label: 'data', icon: 'folder' },
      { label: 'log', icon: 'toc' },
      { label: 'permissions', icon: 'gavel' }
    ],
    group: null
  }),
  computed: {
    cssVars () {
      return {
        '--url': 'url(' + this.previewConfig.logo.url + ')'
      }
    }
  }
}
</script>
<style scoped>
a {
    background-color: transparent;
    margin: 10px;
}

#logo {
    display: block;
    content: var(--url);
    max-height: 30px;
}
</style>
