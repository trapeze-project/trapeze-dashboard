<template>
  <div class="text-center">
    <v-snackbar
      top
      v-model="snackbar"
      :timeout="timeout"
      color="green darken-1"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="green lighten-4"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      <v-progress-linear
        v-model="valueDeterminate"
        color="green lighten-2"
      ></v-progress-linear>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        snackbar: false,
        text: null,
        timeout: 5000,
        valueDeterminate : 100,
        interval: null,
        intervalDelay: 100,
        steps:0
      } 
    },
    methods:{
      showNotification(text){
        this.text = text
        clearInterval(this.interval)
        this.snackbar = true;
        this.valueDeterminate = 100
        this.steps = 0
        this.interval = setInterval(()=>{
          if(this.valueDeterminate <= 0){
            clearInterval(this.interval)
          }
          this.steps +=1
          this.valueDeterminate = 100*(this.timeout-this.steps*this.intervalDelay)/this.timeout;
        },100);
      }
    }
  }
</script>

<style>

</style>