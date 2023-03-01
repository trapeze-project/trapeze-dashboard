<template>
  <div>
    <v-card class="mt-3">
      <v-card-title>
        Privacy Policy
      </v-card-title>
      <v-container>
        <div class="choose-table">
          <!-- NOTE: @click:row is temporarily null, i.e. no selection -->
          <v-data-table
            :headers="headers"
            :items="category"
            :item-key="headers[0].value"
            single-select
            mobile-breakpoint="0"
            :footer-props="{'items-per-page-text': $t('consent.consent.ptable.footer.rows-per-page')}"
            @click:row="select"
          >
            <template v-slot:item.policy="{ item }">
              <a :href="'/data/policy-pdfs/'+ item.policy.split(' ')[0]" target="_blank">{{ item.policy }}</a>
            </template>
          </v-data-table>

          <div v-if="view.showPEmail" id="PEmail" class="mt-4">
            <PEmail :date="view.selected.date" :event="view.selected.untranslatedEvent" />
          </div>

        </div>
      </v-container>
    </v-card>
  </div>

</template>

<script>

import emails from '../../static/data/emails.json'

export default {
  data () {
    return {
      imports: {
        category: '',
      },
      view: {
        selected: '',
        showPEmail: false
      },
      headers: '',
      pDetailsSubItemsMap: ''
    }
  },
  computed: {
    category () {
      const result = []
      for (const notification of emails) {
        const obj = {}
        obj.date = notification.date
        obj.event = this.$t('consent.consent.ptable.events.values.' + notification.event)
        obj.untranslatedEvent = notification.event
        const policyArr = notification.policy.replace(')', '').replace('(', '').split(' ')
        obj.policy = policyArr[0] + ' (' + this.$t('consent.consent.ptable.policy.' + policyArr[1]) + ')'
        result.push(obj)
      }
      return result
    },
    calculateBottonsValues () {
      if (this.view.selected !== '') {
        return JSON.parse(JSON.stringify(this.modifiedUserChoices[this.view.selected.untranslated]))
      }
    }
  },
  created () {
    this.headers = this.calculatePTableHeaders(['date', 'event', 'policy'])
  },
  methods: {
    select (item, row) {
      row.select(true)
      this.view.selected = item
			this.view.showPEmail = true

      // vue.$nextTick Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.
      this.$nextTick(() => {
        this.scrollpage()
      })
    },
    calculatePTableHeaders (header) {
      return header.map(e => ({
        text: this.$t('consent.consent.ptable.header.values.' + e),
        value: e,
        align: 'start'
      }))
    },


    scrollpage () {
      if (this.tabName === 'consent') {
        document.getElementById('PEmail').scrollIntoView({ behavior: 'smooth' })
      }else if (['purpose','data'].includes(this.tabName)) {
        if (this.view.showPDetails && this.consentHelperUserChoices && this.modifiedWarnings[this.view.selected.untranslated] && Object.keys(this.modifiedWarnings[this.view.selected.untranslated]).length) {
          document.getElementById('PWarnings').scrollIntoView({ behavior: 'smooth' })
        } else {
          document.getElementById('PDetails').scrollIntoView({ behavior: 'smooth' })
        }
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
