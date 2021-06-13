<template>
  <div id="index">
    <v-tour name="indexTour" :steps="steps" />
    <h1 class="title align-center d-flex">
      {{ $t('home.title') }}
      <v-icon class="ml-1" color="primary" @click="$tours.indexTour.start()">
        mdi-help-circle
      </v-icon>
    </h1>
    <v-divider />
    <br>
    <v-row justify="center" align="center">
      <v-col
        v-for="(item, idx) in Object.values($t('home.items'))"
        :key="idx"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <PExplainCard :title="item.title" :content="item.content" :filename="item.filename" :href="item.link" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data: () => ({
    steps: [
      {
        target: '[index-v-step="0"]', // We're using document.querySelector() under the hood
        header: {
          title: 'Welcome to the Finder Privacy Dashboard'
        },
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'You can always return to this page by clicking the <strong>Home</strong> button!'
      },
      {
        target: '[index-v-step="1"]', // We're using document.querySelector() under the hood
        header: {
          title: 'Profile'
        },
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'Review the data you provided us when signing up for this <strong>Finder GmbH</strong>.'
      },
      {
        target: '[index-v-step="2"]', // We're using document.querySelector() under the hood
        header: {
          title: 'About us'
        },
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'Learn about <strong>Finder GmbH</strong> and companies involved in providing Finder.'
      },
      {
        target: '[index-v-step="3"]', // We're using document.querySelector() under the hood
        header: {
          title: 'Data we collect'
        },
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'Explore the data we collected, when you used Finder.'
      },
      {
        target: '[index-v-step="4"]', // We're using document.querySelector() under the hood
        header: {
          title: 'Permissions'
        },
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'Learn what you agreed with when accepting the terns and conditions'
      },
      {
        target: '[index-v-step="5"]', // We're using document.querySelector() under the hood
        header: {
          title: 'Languages'
        },
        params: {
          highlight: true
        },
        content: 'You can change the language of the dashboard'
      }
    ]
  }),
  mounted () {
    if (this.$auth.user) {
      if (!localStorage.getItem('visitedIndex')) {
        this.$tours.indexTour.start()
        localStorage.setItem('visitedIndex', true)
      }
    }
  }
}
</script>
