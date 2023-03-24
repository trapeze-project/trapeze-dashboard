<template>
  <v-card class="rounded-xl">

    <v-card-title>
      {{ $t("home.title") }}
    </v-card-title>

    <v-card-text>
      {{ $t("home.welcome-msg1")}} 

      <div 
        class="d-flex justify-end"
      >
        <v-sheet 
          class="pa-1 pr-3 rounded-pill clickable mt-3 mb-0"
          outlined
          @click="showMore = !showMore" 
          v-show="!showMore"          
        >
          <v-icon>mdi-chevron-down</v-icon>
          {{ $t("btn.labels.show-details") }}
        </v-sheet>
      </div>

      <v-expand-transition >
        <div v-show="showMore" class="mt-5">
            <ul>
              <li
                v-for="(item, idx) in items"
                :key="idx"
              >
                {{ item.name }}
              </li>
            </ul>

            <div class="d-flex justify-end">
              <v-sheet 
                class="pa-1 pr-3 rounded-pill clickable mt-3 mb-0"
                outlined
                @click="showMore = !showMore" 
                v-show="showMore"                 
              >
                <v-icon>mdi-chevron-up</v-icon>
                {{ $t("btn.labels.hide-details") }}
              </v-sheet>
            </div>

        </div>
      </v-expand-transition>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showMore: false,
    };
  },
  computed: {
    items() {
      return Object.values(this.$t("home.purpose"));
    }
  }
};
</script>

<style>
li {
  margin-top: 15px;
}
</style>