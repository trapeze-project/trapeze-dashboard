<template>
  <div class="text-center">
    <v-snackbar
      top
      v-model="snackbar"
      :timeout="timeout"
      color="orange darken-2"
    >
      {{ text }}

      <v-progress-linear
        v-model="valueDeterminate"
        color="orange lighten-2"
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