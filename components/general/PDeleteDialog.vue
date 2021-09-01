<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" :fullscreen="$vuetify.breakpoint.mobile" width="35%">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <v-icon class="mr-3" x-large color="red">
            mdi-alert-circle-outline
          </v-icon>
          {{ $t('data.delete-dialog.title') }}
        </v-card-title>

        <v-card-text class="mt-3">
          {{ $t('data.delete-dialog.text') }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="error" depressed @click="$emit('close-dialog')">
            {{ $t('data.delete-dialog.btn') }}
          </v-btn>
          <v-btn text @click="$emit('close-dialog')">
            {{ $t('general.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
