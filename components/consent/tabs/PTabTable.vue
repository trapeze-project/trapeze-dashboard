<template>
  <div class="choose-table">
    <!-- NOTE: @click:row is temporarily null, i.e. no selection -->
    <v-data-table
      :headers="headers"
      :items="category"
      :item-key="headers[0].value"
      single-select
      mobile-breakpoint="0"
      :footer-props="{'items-per-page-text': $t('consent.'+tabName+'.ptable.footer.rows-per-page')}"
      @click:row="null"
    >
      <template v-if="['data','purpose'].includes(tabName) " v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="item.issue === '0 '+$t('consent.issues') ? 'transparent' : 'orange'"
        >
          <div id="issues">
            {{ item.issue }}
          </div>
        </v-chip>
      </template>
      <template v-if="['consent'].includes(tabName) " v-slot:item.policy="{ item }">
        <a :href="'/data/'+ item.policy.split(' ')[0]" target="_blank">{{ item.policy }}</a>
      </template>
    </v-data-table>

    <PWarnings
      v-if="view.showPDetails && this.warnings.toString() && this.modifiedWarnings[this.view.selected.untranslated]&& Object.keys(this.modifiedWarnings[this.view.selected.untranslated]).length"
      id="PWarnings"
      :tab-name="tabName"
      :selected-warnings="modifiedWarnings[this.view.selected.untranslated]"
      :parent="this.view.selected.untranslated"
      @ignoreWarning="ignoreWarning"
      @changeUserChoice="changeUserChoice"
      @saveState="saveState"
    />
    <!-- :key="this.view.selected.untranslated" -->
    <PDetails
      v-if="view.showPDetails"
      id="PDetails"
      :key="Object.values(this.calculateBottonsValues).toString()"
      class="mt-4"
      :heading="view.selected.untranslated"
      :subitems="pDetailsSubItemsMap[view.selected.untranslated]"
      :show-sensitivity="false"
      :switches-values="this.calculateBottonsValues"
      @changeUserChoice="changeUserChoice"
      @saveState="saveState"
    />
    <div v-if="view.showPEmail" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.untranslatedEvent" />
    </div>
  </div>
</template>

<script>

import examplePolicy from '../../../static/data/example.policy.json'
import emails from '../../../static/data/emails.json'

export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator (value) {
        // The value must match one of these strings
        return ['consent', 'data', 'purpose'].includes(value)
      }
    },
    userChoices: {
      type: Object,
      required: false
    },
    warnings: {
      required: false
    }
  },
  data () {
    return {
      imports: {
        category: '',
        categoryMap: '',
        purposeMap: ''
      },
      view: {
        selected: '',
        showPDetails: false,
        showPEmail: false
      },
      headers: '',
      pDetailsSubItemsMap: '',
      modifiedUserChoices: '',
      consentHelperUserChoices: '',
      modifiedWarnings: '',
      states: []
    }
  },
  computed: {
    category () {
      const result = []
      if (this.tabName === 'consent') {
        for (const notification of emails) {
          const obj = {}
          obj.date = notification.date
          obj.event = this.$t('consent.consent.ptable.events.values.' + notification.event)
          obj.untranslatedEvent = notification.event
          const policyArr = notification.policy.replace(')', '').replace('(', '').split(' ')
          obj.policy = policyArr[0] + ' (' + this.$t('consent.consent.ptable.policy.' + policyArr[1]) + ')'
          result.push(obj)
        }
      } else if (this.tabName === 'data') {
        for (const dataCategory of Object.keys(this.imports.categoryMap)) {
          const obj = {}
          obj.untranslated = dataCategory
          obj.data = this.$t(dataCategory)
          obj.purposes = this.imports.categoryMap[dataCategory].map((item) => { return this.$t(item) }).join(', ')
          obj.recipient = 'Company A'
          if (this.warnings.toString() && this.modifiedWarnings[dataCategory]) {
            const issuesCounter = Object.keys(this.modifiedWarnings?.[dataCategory])?.length
            if (issuesCounter === 1) {
              obj.issue = issuesCounter + ' ' + this.$t('consent.issue')
            } else {
              obj.issue = issuesCounter + ' ' + this.$t('consent.issues')
            }
          } else {
            obj.issue = '0 ' + this.$t('consent.issues')
          }
          result.push(obj)
        }
      } else if (this.tabName === 'purpose') {
        for (const purpose of Object.keys(this.imports.purposeMap)) {
          const obj = {}
          obj.untranslated = purpose
          obj.purpose = this.$t(purpose)
          obj.data = this.imports.purposeMap[purpose].map((item) => { return this.$t(item) }).join(', ')
          if (this.warnings.toString() && this.modifiedWarnings[purpose]) {
            const issuesCounter = Object.keys(this.modifiedWarnings?.[purpose])?.length
            if (issuesCounter === 1) {
              obj.issue = issuesCounter + ' ' + this.$t('consent.issue')
            } else {
              obj.issue = issuesCounter + ' ' + this.$t('consent.issues')
            }
          } else {
            obj.issue = '0 ' + this.$t('consent.issues')
          }
          result.push(obj)
        }
      }
      return result
    },
    calculateBottonsValues () {
      if (this.view.selected !== '') {
        return JSON.parse(JSON.stringify(this.modifiedUserChoices[this.view.selected.untranslated]))
      }
    }
  },
  watch: {
    userChoices: {
      handler (new_value, old_value) {
        if (JSON.stringify(new_value) !== JSON.stringify(old_value)) {
          this.modifiedUserChoices = new_value
        }
      },
      deep: true
    },
    warnings: {
      handler (new_value, old_value) {
        if (JSON.stringify(new_value) !== JSON.stringify(old_value)) {
          this.modifiedWarnings = new_value
        }
      },
      deep: true
    }
  },
  created () {
    if (this.tabName === 'consent') {
      this.headers = this.calculatePTableHeaders(['date', 'event', 'policy'])
    }
    if (this.tabName === 'data') {
      this.headers = this.calculatePTableHeaders(['data', 'purposes', 'issue'])
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.categoryMap
    }
    if (this.tabName === 'purpose') {
      this.headers = this.calculatePTableHeaders(['purpose', 'data', 'issue'])
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.purposeMap
    }

    if (this.tabName === 'purpose') {
      this.modifiedUserChoices = JSON.parse(JSON.stringify(this.userChoices))
      if (this.$route.params.consentHelperUserChoices) {
        this.modifiedWarnings = this.warnings
      }
    } else if (this.tabName === 'data') {
      this.modifiedUserChoices = JSON.parse(JSON.stringify(this.userChoices))
      if (this.$route.params.consentHelperUserChoices) {
        this.modifiedWarnings = this.warnings
      }
    }
  },
  methods: {
    select (item, row) {
      row.select(true)
      this.view.selected = item
      if (this.tabName === 'purpose' || this.tabName === 'data') {
        this.view.showPDetails = true
      }
      if (this.tabName === 'consent') {
        this.view.showPEmail = true
      }

      // vue.$nextTick Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.
      this.$nextTick(() => {
        this.scrollpage()
      })
    },
    calculatePTableHeaders (header) {
      return header.map(e => ({
        text: this.$t('consent.' + this.tabName + '.ptable.header.values.' + e),
        value: e,
        align: 'start'
      }))
    },
    calculateCategoryMap () {
      this.imports.categoryMap = examplePolicy.reduce((total, currentValue) => {
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
    },
    calculatePurposeMap () {
      this.imports.purposeMap = examplePolicy.reduce((total, currentValue) => {
        const purpose = currentValue['dpv:Purpose']['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
        currentValue['dpv:PersonalDataCategory'].forEach((item, index) => {
          const personalDataCategory = item['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
          if (!(purpose in total)) {
            total[purpose] = []
          }
          total[purpose].push(personalDataCategory)
        })
        return total
      }, {})
    },
    ignoreWarning (parent, child) {
      delete (this.modifiedWarnings[parent])[child]
      const yo = JSON.parse(JSON.stringify(this.modifiedWarnings))
      this.modifiedWarnings = JSON.parse(JSON.stringify(yo))
    },
    changeUserChoice (parent, child, newConsentValue) {
      this.modifiedUserChoices[parent][child] = newConsentValue
      this.fixWarningIfExist(parent, child, newConsentValue)
      console.log()
    },
    fixWarningIfExist (parent, child, newConsentValue) {
      if (this.warnings.toString()) {
        if (['consent-helper.not-comfortable', 'consent-helper.no-opinion'].includes(this.modifiedWarnings?.[parent]?.[child]?.consentHelperChoice)) {
          if (newConsentValue === false) {
            if (this.modifiedWarnings[parent][child]) {
              this.ignoreWarning(parent, child)
            }
          }
        }
      }
    },
    scrollpage () {
      if (this.tabName === 'consent') {
        document.getElementById('PEmail').scrollIntoView({ behavior: 'smooth' })
      }
      if (this.tabName === 'data') {
        document.getElementById('PDetails').scrollIntoView({ behavior: 'smooth' })
      }
      if (this.tabName === 'purpose') {
        if (this.view.showPDetails && this.$route.params.consentHelperUserChoices && this.modifiedWarnings[this.view.selected.untranslated] && Object.keys(this.modifiedWarnings[this.view.selected.untranslated]).length) {
          document.getElementById('PWarnings').scrollIntoView({ behavior: 'smooth' })
        } else {
          document.getElementById('PDetails').scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    revokeAll () {
      this.saveState()
      Object.keys(this.modifiedUserChoices).forEach((parent) => {
        Object.keys(this.modifiedUserChoices[parent]).forEach((child) => {
          this.changeUserChoice(parent, child, false)
        })
      })
    },
    saveState () {
      const state = {}
      state.view = {}
      state.view.selected = JSON.parse(JSON.stringify(this.view.selected))
      state.view.showPDetails = JSON.parse(JSON.stringify(this.view.showPDetails))
      state.modifiedUserChoices = JSON.parse(JSON.stringify(this.modifiedUserChoices))
      state.modifiedWarnings = JSON.parse(JSON.stringify(this.modifiedWarnings))
      this.states.push(state)
    },
    loadPreviousState () {
      if (this.states.length) {
        const state = this.states.pop()
        this.view.showPDetails = JSON.parse(JSON.stringify(state.view.showPDetails))
        this.view.selected = JSON.parse(JSON.stringify(state.view.selected))
        setTimeout(() => { // to let the see the switcher switching
          this.modifiedUserChoices = JSON.parse(JSON.stringify(state.modifiedUserChoices))
          this.modifiedWarnings = JSON.parse(JSON.stringify(state.modifiedWarnings))
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
a {
  color: inherit;
}
</style>
