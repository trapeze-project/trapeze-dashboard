<template>
  <v-card>
    <v-card-title>
      {{ $t("home.title") }}
    </v-card-title>
    <v-card-text>
      <p style="white-space:pre-line">
        {{ $t("home.welcome-msg1").interpolate(interpolated) }}
      </p>
      <ul>
        <li v-for="(item, idx) in Object.values($t('home.purpose'))" :key="idx">
          {{ item.name }}
        </li>
      </ul>

      <v-divider class="my-3" />

      <p>
        {{ $t("home.welcome-msg2").interpolate(interpolated) }}
      </p>

      <v-btn class="black--text" color="primary" depressed :to="localePath('/' + controller['@id'] + '/help')">
        {{ $t("btn.labels.consent-guide") }}
      </v-btn>
    </v-card-text>

    <!-- <v-card-actions class="mt-2 pt-0">
            <v-spacer></v-spacer>
      <v-btn color="orange lighten-2" text> show more </v-btn>
      <v-btn icon @click="showMore = !showMore">
        <v-icon>{{ showMore ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions> -->

  </v-card>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      interpolated: {
        we: this.controller.name
      }
    }
  },
}
</script>
