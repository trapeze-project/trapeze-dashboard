<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5" style="word-break:break-word">
        {{ this.$t("PAlertLeaveDialog.dialog-title") }}
      </v-card-title>

      <v-card-text>
        {{this.alertBody}}
      </v-card-text>

      <v-card-actions>

        <v-spacer />

        <v-btn
          class="px-2 mx-3 rounded-pill"
          @click="()=>{leaveAnyWay = false; dialog=false; }"
        >
          {{ this.$t("btn.labels.cancel") }}
        </v-btn>

        <v-btn
          class="px-2 rounded-pill black--text" color="primary"
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
