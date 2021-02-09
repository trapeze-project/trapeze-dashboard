<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app color="accent">
      <v-list nav dense>
        <v-list-item-group v-model="group" color="coporate">
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
    <v-app-bar clipped-left app color="coporate">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-spacer />
      <div class="company-wrapper">
        <Logo />
        <b style="color: white"> {{ $config.logo.slogan.toUpperCase() }} </b>
      </div>
      <v-spacer />
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
  })
}
</script>
<style>
.company-wrapper {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
}
</style>
