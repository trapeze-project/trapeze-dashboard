<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app class="grey lighten-4">
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
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
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    links: [
      { to: '/', label: 'home', icon: 'home' },
      { to: '/profile', label: 'profile', icon: 'account_circle' },
      { to: '/about', label: 'about', icon: 'business' },
      { to: '/data', label: 'data', icon: 'folder' },
      { to: '/activities', label: 'log', icon: 'toc' },
      { to: '/permissions', label: 'permissions', icon: 'gavel' }
    ],
    group: null
  }),
  watch: {
    group () {
      // eslint-disable-next-line spaced-comment
      //this.drawer = false
    }
  }
}
</script>
