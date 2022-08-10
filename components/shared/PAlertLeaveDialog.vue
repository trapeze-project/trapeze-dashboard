<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="320"
  >
    <v-card>
      <v-card-title class="text-h5" style="word-break:break-word">
        {{ this.$t("PAlertLeaveDialog.dialog-title") }}
      </v-card-title>
      <v-card-text v-html="this.alertBody" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          text
          @click="()=>{leaveAnyWay = false; dialog=false; }"
        >
          {{ this.$t("btn.labels.cancel") }}
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="()=>{leaveAnyWay = true; dialog=false; }"
        >
          {{ this.$t("btn.labels.leave-anyway") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      leaveAnyWay: undefined,
      dialog: false,
      alertBody: ''
    }
  },
  methods: {
    showAlert (alertBody) {
      this.alertBody = alertBody
      this.leaveAnyWay = undefined
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
