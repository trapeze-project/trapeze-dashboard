<template>
  <div>
    <div class="consent-container">
      <PConsentIconButton
        v-for="item in value"
        :key="item.description"
        v-model="item.value"
        :icon="item.icon"
        :description="item.description"
        @input="$emit('value',value)"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  }
}
</script>

<style scoped>
.consent-container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
}
</style>
