<template>
  <v-card>
    <v-card-title>
      {{ $t("home.title") }}
    </v-card-title>
    <v-card-text>
      <p>{{ $t("home.welcome-msg") }}</p>
      <p>{{ $t("home.welcome-msg2") }}</p>
      <ul>
        <li v-for="(item, idx) in Object.values($t('home.purpose'))" :key="idx">
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
        :to="localePath('/help')"
      >
        {{ $t("btn.labels.consent-guide") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>
