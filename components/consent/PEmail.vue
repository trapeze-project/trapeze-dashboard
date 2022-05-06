<template>
  <v-card flat>
    
    <v-card-title>
      <span>{{ event }}</span>
    </v-card-title>

    <v-card-subtitle>
      <small>{{ date }}</small>
    </v-card-subtitle>

    <v-divider />

    <v-card-text>
      <p v-html="emailText" />

      <v-btn class="black--text" color="primary">
        View Changes
      </v-btn>
    </v-card-text>

  </v-card>
</template>

<script>
import email from "../../static/data/emailText.json";

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
      emailText: email.text
    };
  }
}
</script>