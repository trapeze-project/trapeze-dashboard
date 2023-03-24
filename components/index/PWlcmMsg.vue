<template>
  <v-card class="rounded-xl">

    <v-card-title>
      {{ $t("home.title") }}
    </v-card-title>

    <v-card-text>
      <p class="mb-0">
        {{ $t("home.welcome-msg1").interpolate(paramsForInterpolation) }} 
        <span 
          class="clickable"
          @click="showMore = !showMore" 
          v-show="!showMore"
        >
            <v-sheet 
              class="pa-1 pr-3 d-inline rounded-pill"
              outlined
            >
              <v-icon>mdi-chevron-down</v-icon>
              {{ $t("btn.labels.show-details") }}
            </v-sheet>
          </span>
      </p>

      <v-expand-transition >
        <div v-show="showMore">
            <ul>
              <li
                v-for="(item, idx) in Object.values($t('home.purpose'))"
                :key="idx"
              >
                {{ item.name }}
              </li>
            </ul>
            <p class="mt-3 mb-0">
              <span 
                class="clickable" 
                @click="showMore = !showMore" 
                v-show="showMore" 
              >
              <v-sheet 
                class="pa-1 pr-3 d-inline rounded-pill"
                outlined
              >
                <v-icon>mdi-chevron-up</v-icon>
                {{ $t("btn.labels.hide-details") }}
              </v-sheet>
              </span>
            </p>
        </div>
      </v-expand-transition>
    </v-card-text>

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
    let controllerInfo = this.$store.state.controllerInfo
    this.paramsForInterpolation ={'we':controllerInfo.name}
  },
};
</script>
