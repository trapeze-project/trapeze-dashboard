<template>
  <div id="index">

    <v-row justify="center" align="center">
      <v-col>
        <v-card>
          <v-card-title>
            {{ $t("home.title") }}
          </v-card-title>
          <v-card-text>
            <p>{{ $t("home.welcome-msg") }}</p>
            <p>{{ $t("home.welcome-msg2") }}</p>
            <ul>
              <li
                v-for="(item, idx) in Object.values($t('home.purpose'))"
                :key="idx"
              >
                {{ item.name }}
              </li>
            </ul>

            <v-divider class="my-3" />

            <p>
              {{ $t("home.welcome-msg4") }}
            </p>
            
            <v-btn
              class="black--text"
              color="primary"
              depressed
              :to="localePath('/helper')"
            >
              {{ $t("links.consent_helper") }}
            </v-btn>
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
        <PExplainCard
          :title="item.title"
          :content="item.content"
          :filename="item.filename"
          :href="item.link"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  data: () => ({
    steps: [],
    options: {},
  }),
  mounted() {},
  methods: {},
};
</script>
