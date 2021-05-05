<template>
  <div class="button-container">
    <v-btn
      class="mx-2"
      small
      depressed
      fab
      dark
      :outlined="!value"
      color="primary"
      @click="$emit('input',!value)"
    >
      <v-icon dark>
        {{ icon }}
      </v-icon>
    </v-btn>
    <v-subheader style="word-wrap:break-word;text-align:center">
      {{ description }}
    </v-subheader>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.button-container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 80px;
}
</style>
