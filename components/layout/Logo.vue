<template>
  <div>
    <a v-if="!$vuetify.breakpoint.smAndDown" id="logo" :style="cssVars" href="/" title="Home" />
    <a v-if="$vuetify.breakpoint.smAndDown" id="logo" :style="cssVars_sm" href="/" title="Home" />
  </div>
</template>

<script>
export default {
  computed: {
    cssVars() {
      return {
        "--url": "url(" + this.$config.logo.url + ")",
      };
    },
    cssVars_sm() {
      return {
        "--url": "url(" + this.$config.logo.url_sm + ")",
      };
    },
  },
};
</script>

<style scoped>
#logo {
  display: block;
  content: var(--url);
  max-width: 224px;
  max-height: 50px;
}
</style>
