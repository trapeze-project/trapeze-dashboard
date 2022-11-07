<template>
  <div>
    <PNotification ref="notification" />
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="black--text" v-bind="attrs" color="primary" v-on="on">
          {{ btnName }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          {{$t("contact.new-message-to")}} {{ companyName }}
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
            {{$t("contact.recipient")}}:
          </p>
          <v-text-field v-model="this.email.match(/@.+(?=[.])/)[0]" persistent-hint outlined dence disabled />
          <p class="mt-1 mb-1 black--text">
            {{$t("contact.message")}}:
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
            class="black-text"
            depressed
            color="lightgrey"
            @click="dialog = false"
          >
            {{ $t("btn.labels.cancel") }}
          </v-btn>
          <v-btn
            class="black--text"
            color="primary"
            @click="sendMessage"
          >
            {{ $t("btn.labels.send-message") }}
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
      message: ''
    }
  },
  methods: {
    sendMessage(){
      this.dialog = false;
      const text = this.$t('snackbar.msg.message-sent')
      console.log(text)
      this.$refs.notification.showNotification(text, 'green')
    }
  }
}
</script>
