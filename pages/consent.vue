<template>
  <div>
    <h2>
      Consent Menu
      <v-btn class=" float-right error">
        Revoke All
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
            <v-simple-table>
              <thead>
                <tr>
                  <th>
                    Date
                  </th>
                  <th>
                    Event
                  </th>
                  <th>
                    Policy
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5 Feb 2022 14:00 CEST</td>
                  <td>Consent Request - Policy Update</td>
                  <td>clover-pol.v2.pdf (inactive)</td>
                </tr>
                <tr>
                  <td>1 Feb 2022 16:38 CEST</td>
                  <td>Consent Revocation</td>
                  <td>clover-pol.v1.pdf (active)</td>
                </tr>
                <tr>
                  <td>3 Jan 2022 14:05 CEST</td>
                  <td>Consent Giving</td>
                  <td>clover-pol.v1.pdf (active)</td>
                </tr>
                <tr>
                  <td>
                    3 Jan 2022 14:05 CEST
                  </td>
                  <td>Consent Request - Account Creation</td>
                  <td>clover-pol.v1.pdf (active)</td>
                </tr>
              </tbody>
            </v-simple-table>
            <div class="mt-4">
              <v-card>
                <v-card-title style="background-color: #F5F5F5">
                  {{ $t('general.policy') }}
                </v-card-title>
                <v-card-text>
                  <p>
                    date: 5 Feb 2022, 14:00 pm
                  </p>
                  <p>
                    from: Mr. Charles Clover (cclover@clover.com)
                  </p>
                  <p>
                    Dear client,
                  </p>
                  <p>
                    on behalf of Clover Company, I kindly request you to define your consent with respect to our new privacy  policy (clover-pol.v2). Our new privacy policy will take effect on 1 March 2022 and replace our former privacy
                    policy (clover-pol.v1). Please click on the "View Changes" Button to see the differences between the old and new policy version and conveniently adjust your settings.
                  </p>
                  <p>
                    I am eager to answer any of your questions related to our privacy policies.
                  </p>
                  <p>
                    Kind regards,
                  </p>
                  <p>
                    Charles Clover
                  </p>
                  <p />
                  <p>......</p>
                  <p />
                  <p>
                    Data Protection Officer <br>
                    Clover Company
                    <v-btn class="info float-right">
                      View Changes
                    </v-btn>
                  </p>
                </v-card-text>
              </v-card>
            </div>
          </v-tab-item>
          <v-tab-item value="data">
            <v-simple-table>
              <thead>
                <tr>
                  <th>
                    Data
                  </th>
                  <th>
                    Purposes
                  </th>
                  <th>
                    Recipient
                  </th>
                  <th>
                    Issues
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>None</td>
                  <td>None</td>
                  <td>0 issues</td>
                </tr>
                <tr>
                  <td>Bank Account</td>
                  <td>Advertising, Marketing</td>
                  <td>Company A</td>
                  <td class="red--text">
                    2 issues
                  </td>
                </tr>
                <tr>
                  <td>Credit Card Number</td>
                  <td>Advertising, Marketing, Identity Verification</td>
                  <td>Company A</td>
                  <td class="red--text">
                    2 issues
                  </td>
                </tr>
                <tr>
                  <td>
                    Fingerprint
                  </td>
                  <td>Advertising</td>
                  <td>Company A</td>
                  <td class="red--text">
                    1 issue
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Advertising, Marketing, Identity Verification, and 5 more</td>
                  <td>Company A</td>
                  <td>
                    0 issues
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <div class="mt-4">
              <v-card>
                <v-card-title style="background-color: #F5F5F5">
                  {{ $t('general.location') }}
                  <v-switch style="margin-left: 13%" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                  {{ $t('consent.text') }}
                </v-card-text>
                <PDataCategory :category-title="categoryTitle" />
              </v-card>
            </div>
          </v-tab-item>
          <v-tab-item value="purpose">
            <v-simple-table>
              <thead>
                <tr>
                  <th>
                    Purposes
                  </th>
                  <th>
                    Data
                  </th>
                  <th>
                    Issues
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service Optimization</td>
                  <td>None</td>
                  <td>0 issues</td>
                </tr>
                <tr>
                  <td>Advertising</td>
                  <td>Name, Fingerprint, Bank Account, Credit Card Number</td>
                  <td>
                    <p class="text-bold warning rounded_corner">
                      1 issue
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>Bank Account, Credit Card Number</td>
                  <td>
                    0 issues
                  </td>
                </tr>
                <tr>
                  <td>
                    Identity Verification
                  </td>
                  <td>Name</td>
                  <td>
                    0 issues
                  </td>
                </tr>
                <tr>
                  <td>Authentication</td>
                  <td>Name, Fingerprint</td>
                  <td>
                    0 issues
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <div class="mt-4">
              <v-card>
                <v-card-title style="background-color: #F5F5F5">
                  {{ $t('general.advertising') }}
                  <v-switch style="margin-left: 11%" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                  {{ $t('consent.text_ad') }}
                </v-card-text>
                <div class="ml-3">
                  <p class="font-weight-black">
                    {{ $t(categoryTitle) }}:
                  </p>
                  <p />
                  <v-row>
                    <v-col cols="4">
                      <v-card>
                        <v-simple-table>
                          <thead />
                          <tbody>
                            <tr>
                              <td>
                                {{ $t('consent.name') }}
                              </td>
                              <v-switch />
                            </tr>
                            <tr>
                              <td class="warning">
                                {{ $t('consent.fingerprint') }}
                              </td>
                              <v-switch />
                            </tr>
                            <tr>
                              <td>{{ $t('consent.bank') }} </td>
                              <v-switch />
                            </tr>
                            <tr>
                              <td>{{ $t('consent.credit') }} </td>
                              <v-switch />
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card class="warning">
                        <v-card-title class="text-uppercase">
                          {{ $t('general.warning') }}:
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          {{ $t('general.unrelatedData') }}:
                        </v-card-text>
                        <v-card-text>
                          <li>
                            {{ $t('general.unrelatedDataText') }}
                          </li>
                        </v-card-text>
                        <v-card-text>
                          {{ $t('general.bioData') }}:
                        </v-card-text>
                        <v-card-text>
                          <li>
                            {{ $t('general.bioDataText') }}
                          </li>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
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
      categoryTitle: 'general.category',
      items: [
        'Consent', 'Data', 'Purposes'
      ],
      href: [
        'consent', 'data', 'purposes'
      ]
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
  }
}
</script>
<style>

</style>
