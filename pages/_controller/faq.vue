<template>
  <v-card elevation="0">
    <v-card-title class="pa-0 pb-1">
      {{ $t("qna.header") }}
    </v-card-title>

    <v-divider class="py-1" />

    <v-card-text class="pa-0">
      <v-row>
        <v-col class="pb-0">
          <p>{{ $t("qna.introduction").interpolate(interpolated) }}</p>
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
            <span class="header" style="white-space: pre-line">{{
              category.interpolate(interpolated)
            }}</span>
          </v-expansion-panel-header>

          <v-expansion-panel-content class="px-0">

            <v-expansion-panels flat popout>
              <v-expansion-panel
                v-for="qna in Object.keys(faq[category]['qnas'])"
                :key="faq[category]['qnas'][qna].question"
              >
                <v-expansion-panel-header class="px-0">
                  <template v-slot:actions>
                    <v-icon class="icon" left> $expand </v-icon>
                  </template>
                  <span class="header" style="white-space: pre-line">{{
                    faq[category]["qnas"][qna].question.interpolate(
                      interpolated
                    )
                  }}</span>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <p style="white-space: pre-line">
                    {{
                      faq[category]["qnas"][qna].answer.interpolate(
                        interpolated
                      )
                    }}
                  </p>
                  <div
                    v-if="
                      Object.values(faq[category]['qnas'][qna].references)
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
                          faq[category]['qnas'][qna].references
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
import faqEnUS from "../../static/data/faq-enUS.json";
import faqDeDE from "../../static/data/faq-deDE.json";
import faqItIT from "../../static/data/faq-itIT.json";
import faqFrFR from "../../static/data/faq-frFR.json";

export default {
  props: {
    controller: {
      type: Object,
    }
  },
  data() {
    return {
      faq: "",
      searchValue: "",
      matchedQNA: "",
      searching: false,
      interpolated: {},
    };
  },
  computed: {
    entries() {
      return Object.keys(this.faq).filter((e) => {
        return e.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
  },
  watch: {
    userQuestion(newuserQuestion, olduserQuestion) {
      if (!newuserQuestion) {
        this.searching = false;
      }
    },
  },
  created() {
    this.interpolated = { we: this.controller.name };

    if (this.$i18n.locale === "en") {
      this.faq = faqEnUS;
    } else if (this.$i18n.locale === "de") {
      this.faq = faqDeDE;
    } else if (this.$i18n.locale === "it") {
      this.faq = faqItIT;
    } else if (this.$i18n.locale === "fr") {
      this.faq = faqFrFR;
    }
  },
  methods: {
    search() {
      const keywords = this.userQuestion
        .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "")
        .split(" ");
      const modfaq = [];
      for (const category of Object.keys(this.faq)) {
        for (const qna of Object.values(this.faq[category].qnas)) {
          let matchedKeywords = 0;
          for (const keyword of keywords) {
            if (
              qna.question.toLowerCase().includes(keyword.toLowerCase()) ||
              qna.answer.toLowerCase().includes(keyword.toLowerCase())
            ) {
              matchedKeywords++;
            }
          }
          [qna, matchedKeywords];
          modfaq.push([qna, matchedKeywords]);
        }
      }
      modfaq.sort(function (a, b) {
        return b[1] - a[1];
      });
      this.matchedQNA = modfaq[0][0];
      this.searching = true;
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
