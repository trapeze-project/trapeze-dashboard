<template>
  <div>
    <PNotification ref="notification" />

    <v-dialog 
      class="rounded-xl" 
      v-model="dialog" 
      scrollable 
      width="auto"
      :fullscreen="fullscreen"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="black--text rounded-pill" v-bind="attrs" color="primary" v-on="on">
          {{ btnName }}
        </v-btn>
      </template>

      <v-card class="rounded-xl"  >
        <v-card-title>
          <b class="me-auto">
            {{ $t("contact.heading") }}
          </b>
          
          <v-btn small fab depressed color="white" @click="cancel">
            <v-icon color="grey">
              mdi-window-close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-divider class="mb-8"/>

        <v-card-text class="pb-0">

          <v-text-field 
            class="rounded-pill"
            :label="`${$t('contact.to')}:`"
            v-model="this.email.match(/@.+(?=[.])/)[0]" 
            outlined 
            dense 
            disabled 
          />

          <v-text-field 
            class="rounded-pill"
            :label="`${$t('contact.from')}:`"
            v-model="userEmail"
            :placeholder="$t('placeholder.email-me-back')"
            outlined 
            dense 
          />

          <v-combobox
            class="rounded-pill"
            :label="`${$t('contact.subject')}:`"
            disable-lookup
            outlined 
            :placeholder="$t('placeholder.choose-subject')"
            dense
            :items="subjects"
            v-model="message.subject"
            @input="fillMessageBody"
            @keydown="fillMessageBody"
          />

          <v-textarea
            class="rounded-xl"
            :label="`${$t('contact.message')}:`"
            v-model="message.body"
            auto-grow
            outlined
            rows="3"
            row-height="50"
            :placeholder="$t('placeholder.message-body')"
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="py-3 d-flex justify-end">
          
          <v-btn
            class="black-text rounded-pill px-3"
            depressed
            color="lightgrey"
            @click="cancel"
          >
            {{ $t("btn.labels.cancel") }}
          </v-btn>

          <v-btn
            class="black--text rounded-pill px-3"
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
import emailTemplateEN from  "../../static/data/emailTemplates/emailTemplate-enUS.json";
import emailTemplateDE from  "../../static/data/emailTemplates/emailTemplate-deDE.json";
import emailTemplateFR from  "../../static/data/emailTemplates/emailTemplate-frFR.json";
import emailTemplateIT from  "../../static/data/emailTemplates/emailTemplate-itIT.json";

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
      userEmail: "",
      message: {
        subject: "",
        body: ""
      },
      emailTemplate: {
        "en": emailTemplateEN,
        "de": emailTemplateDE,
        "it": emailTemplateIT,
        "fr": emailTemplateFR
      },
    }
  },

  computed: {
    fullscreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    subjects() {
      return this.emailTemplate[this.$i18n.locale].map((e) => e.subject);
    }
  },
  methods: {
    sendMessage(){
      this.dialog = false;
      const text = this.$t("snackbar.msg.message-sent")
      this.$refs.notification.showNotification(text, "green")
      this.clearAllFields()
    },
    cancel(){
      this.dialog = false;
      this.clearAllFields()
    },
    fillMessageBody(){
      if(this.subjects.includes(this.message.subject)) {
        let messageTemplate = this.emailTemplate[this.$i18n.locale].find((msgTemplate)=>{
          return msgTemplate.subject == this.message.subject

        })
        this.message.body = messageTemplate.body
      }
    },
    clearAllFields(){
      let defaultMessage ={
          subject: "",
          body: ""
      }
      this.message = Object.assign(this.message, defaultMessage)
      this.userEmail = ""
    }
  }
}
</script>

<style>
.v-dialog--active {
  border-radius: 24px !important;
}
</style>