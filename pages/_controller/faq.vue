<template>
  <div>
    <v-card>
      <v-card-title> {{ $t("qna.header") }} </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <p> {{ $t("qna.introduction").interpolate(interpolated) }} </p>
          </v-col>
        </v-row>

        <v-divider class="mb-5" />

        <v-row align="center" justify="center">
          <v-col class="fill-height">
            <v-text-field
              class="custom-placeholer-color"
              v-model="userQuestion"
              :placeholder="$t('placeholder.search-for-a-question-or-an-answer')"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @click:append="search"
              @keyup.enter="search"
           />
          </v-col>
        </v-row>

        <v-card v-if="searching">
          <v-card-title style="white-space:pre-line">
            {{ this.matchedQNA.question.interpolate(interpolated) }}
          </v-card-title>
          <v-card-text style="white-space:pre-line">
            <div>{{ this.matchedQNA.answer.interpolate(interpolated) }}</div>
          </v-card-text>
          <v-card-actions>
            <div v-if="Object.values(matchedQNA.references).length">
              <ol>
                <span v-show="Object.values(matchedQNA.references).length" class="text--primary"> {{ $t("qna.links-and-sources") }}: </span>
                <li v-for="link in Object.values(matchedQNA.references)" :key="link">
                  <a :href="link" class="black--text">{{ link }}</a>
                </li>
              </ol>
            </div>
          </v-card-actions>
        </v-card>

        <v-expansion-panels v-if="!searching" accordion>
          <v-expansion-panel
            v-for="category in Object.keys(this.faq)"
            :key="category"
            class="mb-1"
          >
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-icon class="icon">
                  $expand
                </v-icon>
              </template>
              <span class="header" style="white-space:pre-line">{{ category.interpolate(interpolated) }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="qna in Object.keys(faq[category]['qnas'])"
                  :key="faq[category]['qnas'][qna].question"
                >
                  <v-expansion-panel-header>
                    <template v-slot:actions>
                      <v-icon class="icon" left>
                        $expand
                      </v-icon>
                    </template>
                    <span class="header" style="white-space:pre-line">{{ faq[category]['qnas'][qna].question.interpolate(interpolated) }}</span>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <p style="white-space:pre-line">
                      {{ faq[category]['qnas'][qna].answer.interpolate(interpolated) }}
                    </p>
                    <div
                      v-if="Object.values(faq[category]['qnas'][qna].references).length"
                      class="mt-4 black--text"
                    >
                      <span class="font-weight-bold"> {{ $t("qna.links-and-sources") }}: </span>
                      <ol>
                        <li v-for="link in Object.values(faq[category]['qnas'][qna].references)" :key="link">
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
  </div>
</template>

<script>
import ControllerService from '~/modules/ControllerService';
import faqEnUS from '../../static/data/faq-enUS.json'
import faqDeDE from '../../static/data/faq-deDE.json'
import faqItIT from '../../static/data/faq-itIT.json'
import faqFrFR from '../../static/data/faq-frFR.json'

export default {
  name: 'Faq',
  data () {
    return {
      faq: '',
      userQuestion: '',
      matchedQNA: '',
      searching: false,
      interpolated:{}
    }
  },

  watch: {
    userQuestion (newuserQuestion, olduserQuestion) {
      if (!newuserQuestion) {
        this.searching = false
      }
    }
  },
  created () {

    let controllerInfo = this.$store.state.controllerInfo
    this.interpolated ={'we':controllerInfo.name}

    if (this.$i18n.locale === 'en') {
      this.faq = faqEnUS
    } else if (this.$i18n.locale === 'de') {
      this.faq = faqDeDE
    } else if (this.$i18n.locale === 'it') {
      this.faq = faqItIT
    } else if (this.$i18n.locale === 'fr') {
      this.faq = faqFrFR
    }
  },
  methods: {
    search () {
      const keywords = this.userQuestion.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '').split(' ')
      const modfaq = []
      for (const category of Object.keys(this.faq)) {
        for (const qna of Object.values(this.faq[category].qnas)) {
          let matchedKeywords = 0
          for (const keyword of keywords) {
            if (qna.question.toLowerCase().includes(keyword.toLowerCase()) || qna.answer.toLowerCase().includes(keyword.toLowerCase())) {
              matchedKeywords++
            }
          }
          [qna, matchedKeywords]
          modfaq.push([qna, matchedKeywords])
        }
      }
      modfaq.sort(function (a, b) {
        return b[1] - a[1]
      })
      this.matchedQNA = modfaq[0][0]
      this.searching = true
    }
  }
}
</script>

<style scoped>
.icon {
  order: 0;
}

.header {
  order: 1;
}


</style>
