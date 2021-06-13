<template>
  <div>
    <div class="d-flex flex-row align-center justify-center" style="flex-wrap: wrap">
      <PConsentIconButton
        class="ml-3 mr-3"
        v-for="item in value"
        :key="item.description"
        v-model="item.value"
        :icon="item.icon"
        :description="item.description"
        permission-v-step="0"
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
