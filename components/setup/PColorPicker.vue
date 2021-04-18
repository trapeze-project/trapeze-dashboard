/* eslint-disable vue/html-self-closing */
<template>
  <div class="setup-color-list-item">
    <slot />
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      origin="top right"
      nudge-top="-15px"
      transition="scale-transition"
      offset-x
      left
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <span> <small>{{ selectedColor.toUpperCase() }} </small> <v-avatar
          style="border: 1px solid grey"
          :color="selectedColor"
          :size="30"
          v-bind="attrs"
          v-on="on"
        /></span>
      </template>
      <v-color-picker
        class="color-picker"
        dot-size="25"
        :light="true"
        :dark="false"
        mode="hexa"
        swatches-max-height="200"
        @input="onColorChange"
      />
    </v-menu>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'selectedColor',
    event: 'colorChange'
  },
  props: {
    selectedColor: {
      type: String,
      required: true
    }
  },
  data: () => ({
    menu: false
  }),
  methods: {
    onColorChange (e) {
      // eslint-disable-next-line
      this.$emit('colorChange', e.hex)
    }
  }
}
</script>
<style scoped>
.setup-color-list-item {
    margin-top: 10px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-flow: row nowrap;
    display: relative;
}
</style>
