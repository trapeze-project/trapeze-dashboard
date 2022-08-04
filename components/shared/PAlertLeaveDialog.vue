<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to leave the page?
        </v-card-title>
        <v-card-text v-html="this.alertBody"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="()=>{leaveAnyWay = false; dialog=false; }"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="()=>{leaveAnyWay = true; dialog=false; }"
          >
            Leave anyway
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        leaveAnyWay: undefined,
        dialog:false,
        alertBody:""
      }
    },
    methods:{
        showAlert(alertBody){
            this.alertBody = alertBody
            this.leaveAnyWay = undefined;
            this.dialog = true
        }
    }
  }
</script>