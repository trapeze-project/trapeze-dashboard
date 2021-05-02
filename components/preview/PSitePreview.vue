<template>
  <v-sheet elevation="5">
    <v-app-bar style="z-index: 1" clipped-left :color="previewConfig.theme.light.coporate">
      <v-app-bar-nav-icon color="secondary" />
      <v-spacer />
      <div class="header-preview">
        <a id="logo" :style="cssVars" />
        <v-spacer />
        <b :style="'color:'+ previewConfig.theme.light['secondary']+';margin:10px;'"> {{ previewConfig.logo.slogan.toUpperCase() }} </b>
      </div>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" style="width: 30%" clipped :color="previewConfig.theme.light.accent">
      <v-list nav dense>
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
    </v-navigation-drawer>
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
    drawer: true,
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

.header-preview {
    height: 60px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-items: space-between;
    align-items: center;
}
</style>
