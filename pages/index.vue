<template>
  <div id="index">
    <v-row justify="center" align="center">
      <v-col>
        <v-card>
          <v-card-title>
            {{ $t('home.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('home.welcome-msg') }} <br><br>
            {{ $t('home.welcome-msg2') }} <br>
            <ul>
              <li
                v-for="(item, idx) in Object.values($t('home.purpose'))"
                :key="idx"
              >
                {{ item.name }}
              </li>
            </ul>
            <v-divider />
            <br>
            {{ $t('home.welcome-msg4') }}
            <v-btn
              style="float: right"
              color="primary"
              depressed
              :to="localePath()"
            >
              {{ $t('links.consent_helper') }}
            </v-btn>
            <v-spacer />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col
        v-for="(item, idx) in Object.values($t('home.items'))"
        :key="idx"
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
  // middleware: ['auth'],
  data: () => ({
    steps: [],
    options: {}
  }),
  mounted () {

  },
  methods: {
  }
}
</script>
