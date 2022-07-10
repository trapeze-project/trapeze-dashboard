<template>
  <v-card v-if="event === 'consent-request-policy-update'" flat>
    <v-card-title>
      <span>{{ $t("consent.consent.ptable.events.values."+event) }}</span>
    </v-card-title>

    <v-card-subtitle>
      <small>{{ date }}</small>
    </v-card-subtitle>

    <v-divider />

    <v-card-text>
      <p v-html="emailText" />

      <v-btn class="black--text" color="primary">
        {{ $t("btn.labels.view-changes") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import email from '../../static/data/emailText.json'

export default {
  props: {
    date: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      emailText: ''
    }
  },
  created () {
    this.emailText = email[this.$i18n.locale]
  }
}
</script>
