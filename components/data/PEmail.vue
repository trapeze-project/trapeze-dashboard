<template>
  <v-card>
    <v-card-title style="background-color: #F5F5F5">
      {{ event }}
    </v-card-title>
    <v-card-text>
      date: {{ date }}
      <p v-html="emailText" />
      <v-btn class="info float-right mt-n7">
        View Changes
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
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
      emailText: '<br> <br> from: Mr. Charles Clover (cclover@clover.com) <br><br> Dear client, <br><br> on behalf of Clover Company, I kindly request you to define your consent with respect to our new privacy  policy (clover-pol.v2). Our new privacy policy will take effect on 1 March 2022 and replace our former privacy\n' +
        'policy (clover-pol.v1). Please click on the "View Changes" Button to see the differences between the old and new policy version and conveniently adjust your settings. <br><br> I am eager to answer any of your questions related to our privacy policies. <br><br> Kind regards, <br><br> Charles Clover <br> <br> <br> ...... <br> <br> Data Protection Officer <br> Clover Company'
    }
  }
}
</script>

<style scoped>

</style>
