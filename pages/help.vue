<template>
  <div>
    <v-card>
      <v-card-title>
        {{ $t("consent.title") }}
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="page" flat>
          <v-stepper-header class="elevation-0">
            <template v-for="(type, index) in Object.keys(imports.dataCategoryMap)">
              <v-stepper-step
                :key="`${index}-step`"
                :complete="false"
                :step="index + 1"
              >
                {{ $t("consent." + type.toLowerCase()) }}
              </v-stepper-step>

              <v-divider
                v-if="index < Object.keys(imports.dataCategoryMap).length - 1"
                :key="`${index}-divider`"
              />
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(type, index) in Object.keys(imports.dataCategoryMap)"
              :key="index"
              :step="index + 1"
            >
              <div>
                <div>
                  {{ $t("consent." + type.toLowerCase()) }}
                </div>

                <v-divider class="my-3" />

                <div class="my-3">
                  {{ $t(type.toLowerCase()) }}
                </div>

                <p class="font-weight-bold">
                  {{ $t("consent.purpose") }}
                </p>

                <PDataCategoryHelper class="mt-3" :categories="imports.dataCategoryMap[Object.keys(imports.dataCategoryMap)[page-1]]" @userChoinces="collectUserChoices" />
              </div>

              <div class="text-center mt-5 mb-1">
                <v-btn
                  class="black--text"
                  color="light"
                  :disabled="page === 1"
                  @click="page--"
                >
                  {{ $t("btn.labels.back") }}
                </v-btn>
                <v-btn
                  v-if="page < Object.keys(imports.dataCategoryMap).length"
                  class="black--text"
                  color="primary"
                  :disabled="page === Object.keys(imports.dataCategoryMap).length"
                  @click="page++"
                >
                  {{ $t("btn.labels.next") }}
                </v-btn>
                <v-btn
                  v-if="page === Object.keys(imports.dataCategoryMap).length"
                  class="black--text"
                  color="primary"
                  @click="loadConsentPage()"
                >
                  {{ $t("btn.labels.view-issues") }}
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import examplePolicy from '../static/data/example.policy.json'
export default {
  name: 'Helper',
  data () {
    return {
      imports: {
        dataCategoryMap: ''
      },
      consentHelperUserChoices: {},
      page: 1
    }
  },
  created () {
    this.calculateDataCategoryMap()
  },
  methods: {
    collectUserChoices (userChoices) {
      // this.consentHelperUserChoices[Object.keys(this.imports.dataCategoryMap)[this.page-1]] = userChoices;
      const userChoicesPurposes = Object.keys(userChoices)

      for (let i = 0; i < userChoicesPurposes.length; i++) {
        if (this.consentHelperUserChoices[userChoicesPurposes[i]] == null) {
          this.consentHelperUserChoices[userChoicesPurposes[i]] = new Object()
        }
        this.consentHelperUserChoices[userChoicesPurposes[i]][Object.keys(this.imports.dataCategoryMap)[this.page - 1]] = userChoices[userChoicesPurposes[i]]
      }
    },
    loadConsentPage () {
      const consentPageRoute = this.$router.options.routes.find(route => route.path === this.localePath('/consent'))
      this.$router.push({ name: consentPageRoute.name, query: { tab: 'purpose' }, params: { consentHelperUserChoices: this.consentHelperUserChoices } })
    },
    calculateDataCategoryMap () {
      this.imports.dataCategoryMap = examplePolicy.reduce((total, currentValue) => {
        const purpose = currentValue['dpv:Purpose']['@class'].substring(4)
        currentValue['dpv:PersonalDataCategory'].forEach((item, index) => {
          const personalDataCategory = item['@class'].substring(4)
          if (!(personalDataCategory in total)) {
            total[personalDataCategory] = []
          }
          total[personalDataCategory].push(purpose)
        })
        return total
      }, {})
    }

  }
}
</script>
