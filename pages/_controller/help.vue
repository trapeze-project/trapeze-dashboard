<template>
  <div>
    <PNotification ref="helpNotification" />
    <v-card>
      <v-card-title>
        {{ $t("consent.title") }}
      </v-card-title>

      <v-card-text>{{ $t("help.desc") }}</v-card-text>

      <v-card-text>
        <v-stepper v-model="page" flat>
          <v-stepper-header class="elevation-0">
            <template v-for="(type, index) in Object.keys(imports.dataCategoryMap)">
              <v-stepper-step
                :key="`${index}-step`"
                :complete="false"
                :step="index + 1"
              >
                {{ $t(type) }}
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
              class="pa-0"
            >
              <div>
                <div style="white-space:pre-line">{{ $t(type.replace('dpv.','')).interpolate(paramsForInterpolation) }}</div>

                <v-divider class="my-3" />

                <div class="my-3">
                  {{ $t(type.toLowerCase()) }}:
                  {{ $t("help.comfort") }}
                </div>

                <p class="font-weight-bold">
                  {{ $t("consent-helper.purpose") }}
                </p>

                <PDataCategoryHelper 
                  class="mt-3" 
                  :type="type"
                  :categoryMap="imports.dataCategoryMap"
                  @userChoices="collectUserChoices" 
                />
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
import examplePolicy from '../../static/data/example.policy.json'
import controller from '../../static/data/controller.json'

export default {
  name: 'Helper',
  data () {
    return {
      paramsForInterpolation: {},
      organizationName : this.$nuxt.$route.path.split('/')[2],
      imports: {
        dataCategoryMap: ''
      },
      consentHelperUserChoices: {},
      page: 1,
      dataCategoryCompletedChoosement: []
    }
  },
  created () {
    this.calculateDataCategoryMap();
    this.paramsForInterpolation = this.$store.state.dataController.paramsForInterpolation


    /*
    let stored = window.localStorage.getItem("consent");
    if (stored) {
      this.consentHelperUserChoices = JSON.parse(stored);
    }
    */
  },
  methods: {
    collectUserChoices (userChoices, dataCategory) {
      // this.consentHelperUserChoices[Object.keys(this.imports.dataCategoryMap)[this.page-1]] = userChoices;
      const userChoicesPurposes = Object.keys(userChoices)
      // mark the data category as compeleted
      if (!this.dataCategoryCompletedChoosement.includes(dataCategory)) {
        this.dataCategoryCompletedChoosement.push(dataCategory)
      }

      // saving user choices in consentHelperUserChoices
      for (let i = 0; i < userChoicesPurposes.length; i++) {
        if (this.consentHelperUserChoices[userChoicesPurposes[i]] == null) {
          this.consentHelperUserChoices[userChoicesPurposes[i]] = {}
        }
        this.consentHelperUserChoices[userChoicesPurposes[i]][dataCategory] = userChoices[userChoicesPurposes[i]]
      }
    },
    loadConsentPage () {
      if (this.dataCategoryCompletedChoosement.length !== Object.keys(this.imports.dataCategoryMap).length) {
        const text = this.$t('snackbar.msg.please-complete-the-consent-guide')
        this.$refs.helpNotification.showNotification(text, 'orange')
      } else {
        window.localStorage.setItem("consent", JSON.stringify(this.consentHelperUserChoices));
        this.$router.push({ path:this.localePath(`/${this.organizationName}/consent`), query: { tab: 'purpose' }})
      }
    },
    calculateDataCategoryMap () {
      this.imports.dataCategoryMap = examplePolicy.reduce((total, currentValue) => {
        const purpose = currentValue['dpv:Purpose']['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
        currentValue['dpv:PersonalDataCategory'].forEach((item, index) => {
          const personalDataCategory = item['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
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
