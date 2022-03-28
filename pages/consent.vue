<template>
  <div>
    <h2>
      Consent Menu
      <v-btn class=" float-right error">
        {{ $t('general.revoke') }}
      </v-btn>
    </h2>
    <div>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="grey lighten-4"
        >
          <!--          <v-tab-->
          <!--            v-for="item in items"-->
          <!--            :key="item"-->
          <!--          >-->
          <!--            {{ item }}-->
          <!--          </v-tab>-->
          <v-tab href="#consent">
            Consent
          </v-tab>
          <v-tab href="#data">
            Data
          </v-tab>
          <v-tab href="#purpose">
            Purposes
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="consent">
            <v-data-table
              :headers="headers_email"
              :items="emails"
              item-key="date"
              class="elevation-1"
              single-select
              @click:row="handleClick_email"
            />
            <div v-show="isHidden_email" class="mt-4">
              <PEmail :date="date" :event="event" />
            </div>
          </v-tab-item>
          <v-tab-item value="data">
            <v-data-table
              :headers="headers_data"
              :items="data"
              item-key="data"
              class="elevation-1"
              single-select
              @click:row="handleClick_data"
            />
            <div v-show="isHidden_data">
              <PDataHeader
                :category="category"
              />
              <PDataCategory
                :categories="categories[category]"
              />
              <PSensitivity
                :sensitivity="sensitivity[category]"
              />
            </div>
          </v-tab-item>
          <v-tab-item value="purpose">
            <v-data-table
              :headers="headers_purpose"
              :items="purpose"
              item-key="purpose"
              class="elevation-1"
              single-select
              @click:row="handleClick_purpose"
            />
            <div v-show="isHidden_purpose" class="mt-4">
              <PDataHeader
                :category="category"
              />
              <v-row>
                <v-col>
                  <PDataCategoryPurpose
                    :category="category"
                    :categories="categories[category]"
                  />
                </v-col>
                <v-col class="mb-4 mr-4">
                  <PPurposeCard />
                </v-col>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <div class="mt-4 float-right">
      <v-btn class="grey">
        Undo changes
      </v-btn>
      <v-btn class="cyan">
        See Changes
      </v-btn>
      <v-btn class="info">
        Submit Changes
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emails: [
        {
          date: '5 Feb 2022 14:00 CEST',
          event: 'Consent Request - Policy Update',
          policy: 'clover-pol.v2.pdf  (inactive)'
        },
        {
          date: '1 Feb 2022 16:38 CEST',
          event: 'Consent Revocation',
          policy: 'clover-pol.v1.pdf (active)'
        },
        {
          date: '3 Jan 2022 14:05 CEST',
          event: 'Consent Giving',
          policy: 'clover-pol.v1.pdf  (active)'
        },
        {
          date: '3 Jan 2022 14:00 CEST',
          event: 'Consent Request - Account Creation',
          policy: 'clover-pol.v1.pdf  (active)'
        }
      ],
      headers_email: [
        {
          text: 'Date',
          align: 'start',
          value: 'date'
        },
        { text: 'Event', value: 'event' },
        { text: 'Policy', value: 'policy' }
      ],
      data: [
        {
          data: 'Location',
          purpose: 'None',
          recipient: 'None',
          issue: '0 issues'
        },
        {
          data: 'Bank Account',
          purpose: 'Advertising, Marketing',
          recipient: 'Company A',
          issue: '2 issues'
        },
        {
          data: 'Credit Card Number',
          purpose: 'Advertising, Marketing, Identity Verification',
          recipient: 'Company A',
          issue: '2 issues'
        },
        {
          data: 'Fingerprint',
          purpose: 'Advertising',
          recipient: 'Company A',
          issue: '1 issue'
        },
        {
          data: 'Name',
          purpose: 'Advertising, Marketing, Identity Verification, and 5 more',
          recipient: 'Company A',
          issue: '0 issues'
        }
      ],
      headers_data: [
        {
          text: 'Data',
          align: 'start',
          value: 'data'
        },
        { text: 'Purposes', value: 'purpose' },
        { text: 'Recipient', value: 'recipient' },
        { text: 'Issues', value: 'issue' }
      ],
      purpose: [
        {
          data: 'None',
          purpose: 'Service Optimization',
          issue: '0 issues'
        },
        {
          data: 'Name, Fingerprint, Bank account, Credit Card Number',
          purpose: 'Advertising',
          issue: '2 issues'
        },
        {
          data: 'Bank Account, Credit Card Number',
          purpose: 'Marketing',
          issue: '2 issues'
        },
        {
          data: 'Name',
          purpose: 'Identity Verification',
          issue: '1 issue'
        },
        {
          data: 'Name, Fingerprint',
          purpose: 'Authentication',
          issue: '0 issues'
        }
      ],
      headers_purpose: [
        {
          text: 'Purposes',
          align: 'start',
          value: 'purpose'
        },
        { text: 'Data', value: 'data' },
        { text: 'Issues', value: 'issue' }
      ],
      categoryTitle: 'general.category',
      items: [
        'Consent', 'Data', 'Purposes'
      ],
      href: [
        'consent', 'data', 'purposes'
      ],
      isHidden_email: false,
      isHidden_data: false,
      isHidden_purpose: false,
      date: '',
      event: '',
      category: '',
      categories: {
        Name: ['Advertising', 'Marketing', 'Identity Verification'],
        Fingerprint: ['Advertising'],
        Location: [],
        'Credit Card Number': ['Advertising', 'Marketing', 'Identity Verification'],
        'Bank Account': ['Advertising', 'Marketing'],
        'Service Optimization': [],
        Advertising: ['Name', 'Fingerprint', 'Bank account', 'Credit Card Number'],
        Marketing: ['Bank Account', 'Credit Card Number'],
        'Identity Verification': ['Name'],
        Authentication: ['Name', 'Fingerprint']
      },
      sensitivity: {
        Name: 30,
        Fingerprint: 10,
        Location: 0,
        'Credit Card Number': 50,
        'Bank Account': 20
      }
    }
  },
  computed: {
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    }
  },
  methods: {
    handleClick_email (item, row) {
      this.isHidden_email = true
      row.select(true)
      this.date = item.date
      this.event = item.event
    },
    handleClick_data (item, row) {
      this.isHidden_data = true
      row.select(true)
      this.category = item.data
    },
    handleClick_purpose (item, row) {
      this.isHidden_purpose = true
      row.select(true)
      this.category = item.purpose
    }
  }
}
</script>
<style>
tr.v-data-table__selected {
  background: #0085FC !important;
}
</style>
