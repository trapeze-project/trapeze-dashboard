<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      top
      :timeout="timeout"
      :color="`${color} darken-1`"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          :color="`${color} lighten-4`"
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      <v-progress-linear
        v-model="valueDeterminate"
        :color="`${color} lighten-2`"
      />
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      text: null,
      color: '',
      timeout: 5000,
      valueDeterminate: 100,
      interval: null,
      intervalDelay: 100,
      steps: 0
    }
  },
  methods: {
    showNotification (text, color) {
      this.text = text
      this.color = color
      this.timeout = text.split(' ').length  *2500
      clearInterval(this.interval)
      this.snackbar = true
      this.valueDeterminate = 100
      this.steps = 0
      this.interval = setInterval(() => {
        if (this.valueDeterminate <= 0) {
          clearInterval(this.interval)
        }
        this.steps += 1
        this.valueDeterminate = 100 * (this.timeout - this.steps * this.intervalDelay) / this.timeout
      }, 100)
    }
  }
}
</script>

<style>

</style>
