<template>
  <div style="width:100">
    <a id="logo" :style="cssVars" href="/" title="Home" />
  </div>
</template>

<script>
export default {
  computed: {
    cssVars () {
      return {
        '--url': 'url(' + this.$config.logo.url + ')'
      }
    }
  }
}
</script>
<style scoped>
a {
    background-color: transparent;
}

#logo {
    display: block;
    content: var(--url);
    max-height: 50px;
}
</style>
