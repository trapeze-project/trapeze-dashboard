<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      top
      :timeout="-1"
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
      intervalDelay: 100
    }
  },
  methods: {
    showNotification (text, color) {
      clearInterval(this.interval)
      this.timeout=0;
      this.text = text
      this.color = color
      this.timeout = text.split(' ').length * 2500
      // extend time 
      this.valueDeterminate = 100
      this.snackbar = true

      this.interval = setInterval(() => {
        if (this.valueDeterminate <= 0) {
          this.snackbar = false;
          clearInterval(this.interval)
        }
        
        this.valueDeterminate -= 100*this.intervalDelay / this.timeout
      }, this.intervalDelay)
    }
  }
}
</script>