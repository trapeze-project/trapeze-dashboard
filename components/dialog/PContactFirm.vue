<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          color="primary"
          v-on="on"
        >
          {{ btnName }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          New Message to {{ companyName }}
          <v-spacer />
          <v-btn small fab depressed color="white" @click="dialog = false">
            <v-icon color="grey">
              mdi-window-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <p class="mt-4 mb-1 black--text">
            Recipient:
          </p>
          <v-text-field
            v-model="recipient"
            persistent-hint
            outlined
            dence
          />
          <p class="mt-1 mb-1 black--text">
            Message:
          </p>
          <v-textarea
            v-model="message"
            auto-grow
            outlined
            rows="3"
            row-height="30"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="custom-transform-class text-none"
            dark
            color="grey"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="custom-transform-class text-none"
            color="primary"
            @click="dialog = false"
          >
            Send message
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true
    },
    btnName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      dialog: false,
      recipient: this.email.match(/@.+(?=[.])/)[0],
      message: ''
    }
  }
}
</script>

<style>
</style>
