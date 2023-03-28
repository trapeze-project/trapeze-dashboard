<template>
  <v-card elevation="0">
    <v-card-title class="pa-0 pb-1">
      {{ $t("qna.header") }}
    </v-card-title>

    <v-divider class="py-1" />

    <v-card-text class="pa-0">
      <v-row>
        <v-col class="pb-0">
          <p>{{ $t("qna.introduction") }}</p>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col class="fill-height pt-0">
          <v-text-field
            class="rounded-pill"
            v-model="searchValue"
            :placeholder="$t('placeholder.search-for-a-question-or-an-answer')"
            outlined
            dense
            clearable
            append-icon="mdi-magnify"
            @keyup.enter="() => null"
            @click:append="() => null"
            @click:clear="() => null"
          />
        </v-col>
      </v-row>

      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="category in entries"
          :key="category"
          class="mb-3 rounded-xl"
        >
          <v-expansion-panel-header>
            <template v-slot:actions>
              <v-icon class="icon"> $expand </v-icon>
            </template>
            <span class="header newline-character-support" >
              {{category}}
            </span>
          </v-expansion-panel-header>

          <v-expansion-panel-content class="px-0">

            <v-expansion-panels flat popout>
              <v-expansion-panel
                v-for="qna in Object.keys(faq[$i18n.locale][category]['qnas'])"
                :key="faq[$i18n.locale][category]['qnas'][qna].question"
              >
                <v-expansion-panel-header class="px-0">
                  <template v-slot:actions>
                    <v-icon class="icon" left> $expand </v-icon>
                  </template>
                  <span class="header newline-character-support" >
                    {{faq[$i18n.locale][category]["qnas"][qna].question}}
                  </span>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <p class="newline-character-support">
                    {{
                      faq[$i18n.locale][category]["qnas"][qna].answer
                    }}
                  </p>
                  <div
                    v-if="
                      Object.values(faq[$i18n.locale][category]['qnas'][qna].references)
                        .length
                    "
                    class="mt-4 black--text"
                  >
                    <span class="font-weight-bold">
                      {{ $t("qna.links-and-sources") }}:
                    </span>
                    <ol>
                      <li
                        v-for="link in Object.values(
                          faq[$i18n.locale][category]['qnas'][qna].references
                        )"
                        :key="link"
                      >
                        <a :href="link" class="black--text">{{ link }}</a>
                      </li>
                    </ol>
                  </div>
                </v-expansion-panel-content>

              </v-expansion-panel>
            </v-expansion-panels>
            
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import faqEN from "../static/data/faq-enUS.json";
import faqDE from "../static/data/faq-deDE.json";
import faqIT from "../static/data/faq-itIT.json";
import faqFR from "../static/data/faq-frFR.json";

export default {
  data() {
    return {
      faq: {
        "en": faqEN,
        "de": faqDE,
        "it": faqIT,
        "fr": faqFR
      },
      searchValue: "",
    };
  },
  computed: {
    entries() {
      return Object.keys(this.faq[this.$i18n.locale]).filter((e) => {
        return e.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.icon {
  order: 0;
}

.header {
  order: 1;
}

.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border-color: #fff !important;
}
</style>
