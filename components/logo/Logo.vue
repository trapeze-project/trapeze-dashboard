<template>
  <div>
    <a id="logo" :style="cssVars" href="/" title="Home" />
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
  },
};
</script>

<style scoped>
#logo {
  display: block;
  content: var(--url);
  max-width: 224px;
}
</style>
