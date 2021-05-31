<template>
  <div>
    <div class="d-flex flex-row align-center justify-center" style="width: 100%">
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
