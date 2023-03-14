<template>
  <div>
    <PNotification ref="notification" />
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="black--text rounded-pill" v-bind="attrs" color="primary" v-on="on">
          {{ btnName }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <h1>Contact Form</h1>
          <v-spacer />
          <v-btn small fab depressed color="white" @click="cancel">
            <v-icon color="grey">
              mdi-window-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <b class="mt-4 mb-1 black--text">
            Data Protection Officer (DPO)
          </b>
          <v-text-field v-model="this.email.match(/@.+(?=[.])/)[0]"  outlined dense disabled />
          <b class="mt-1 mb-1 black--text">Contact Email (Optional)</b>
          <v-text-field v-model="userEmail" placeholder="Enter email if you wish to be contacted on this matter." outlined dense />

          <div id="message">
            <b class="mt-1 mb-1 black--text">Message</b>
            
            <v-container fluid class="pl-0">
              <v-row >
                <v-col  cols='2' >
                  <p class="mt-1 mb-1 black--text">Subject:</p>
                </v-col>
                <v-col  cols='10'>
                  <v-combobox
                    disable-lookup
                    outlined placeholder="Choose Message Subject..."
                    dense
                    :items="subjects"
                    v-model="message.subject"
                    @input="fillMessageBody"
                    @keydown="fillMessageBody"
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-container>

            <v-textarea
              v-model="message.body"
              auto-grow
              outlined
              rows="3"
              row-height="50"
              placeholder="<Pre-filled Text-template>"
            />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="black-text rounded-pill"
            depressed
            color="lightgrey"
            @click="cancel"
          >
            {{ $t("btn.labels.cancel") }}
          </v-btn>
          <v-btn
            class="black--text rounded-pill"
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
import emailTemplateDeDE from  '../../static/data/emailTemplates/emailTemplate-deDE.json';
import emailTemplateEnUS from  '../../static/data/emailTemplates/emailTemplate-enUS.json';
import emailTemplateFrFR from  '../../static/data/emailTemplates/emailTemplate-frFR.json';
import emailTemplateItIT from  '../../static/data/emailTemplates/emailTemplate-itIT.json';


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
      userEmail:'',
      message: {
        subject:'',
        body:''
      },
      emailTemplate:[]
    }
  },
  created(){



    if (this.$i18n.locale === 'en') {
      this.emailTemplate = emailTemplateEnUS
    } else if (this.$i18n.locale === 'de') {
      this.emailTemplate = emailTemplateDeDE
    } else if (this.$i18n.locale === 'it') {
      this.emailTemplate = emailTemplateItIT
    } else if (this.$i18n.locale === 'fr') {
      this.emailTemplate = emailTemplateFrFR
    }

    this.subjects = this.emailTemplate.map((message)=>{
      return message.subject
    })

  },
  
  methods: {
    sendMessage(){
      this.dialog = false;
      const text = this.$t('snackbar.msg.message-sent')
      this.$refs.notification.showNotification(text, 'green')
      this.clearAllFields()
    },
    cancel(){
      this.dialog = false;
      this.clearAllFields()
    },
    fillMessageBody(){
      if(this.subjects.includes(this.message.subject)){
        let messageTemplate = this.emailTemplate.find((msgTemplate)=>{
          return msgTemplate.subject == this.message.subject

        })
        this.message.body = messageTemplate.body
      }
    },
    clearAllFields(){
      let defaultMessage ={
          subject:'',
          body:''
      }
      this.message = Object.assign(this.message, defaultMessage)
      this.userEmail = ''
    }
  }
}
</script>
