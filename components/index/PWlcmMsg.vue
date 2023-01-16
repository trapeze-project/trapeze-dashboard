<template>
  <v-card>
    <v-card-title>
      {{ $t("home.title") }}
    </v-card-title>
    <v-card-text>
      <p style="white-space: pre-line" class="preLineText">
        {{ $t("home.welcome-msg1").interpolate(paramsForInterpolation) }} <span class="clickable" @click="showMore = !showMore" v-show="!showMore" style="color:blue ;text-decoration: underline;">show more</span>
      </p>
      <v-expand-transition >
        <div v-show="showMore">
            <p style="white-space: pre-line" class="preLineText">
              {{ $t("home.welcome-msg2").interpolate(paramsForInterpolation) }}
            </p>
          
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
              {{ $t("home.welcome-msg3").interpolate(paramsForInterpolation) }} <span class="clickable" @click="showMore = !showMore" v-show="showMore" style="color:blue ;text-decoration: underline;">show less</span>
            </p>

            <v-btn
              class="black--text"
              color="primary"
              depressed
              :to="localePath('/' + organizationName + '/help')"
            >
              {{ $t("btn.labels.consent-guide") }}
            </v-btn>
        </div>
      </v-expand-transition>
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
  data() {
    return {
      organizationName: this.$nuxt.$route.path.split("/")[2],
      showMore: false,
    };
  },
  created() {
    this.paramsForInterpolation =
      this.$store.state.dataController.paramsForInterpolation;
  },
};
</script>
