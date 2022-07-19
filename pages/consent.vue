<template>
  <div>
    <PNotification ref="consentNotification" />
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="8">
            {{ $t("consent.consent-menu") }}
          </v-col>
          <v-col cols="4">
            <v-btn v-if="tab !== 'consent' " class="float-right error" @click="$refs[tab].revokeAll()">
              {{ $t("general.revoke") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" background-color="primary">
        <v-tabs-slider color="black" />

        <v-tab v-for="(tab, index) in tabs" :key="index" :href="'#' + tab.name">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="consent">
          <PTabTable tab-name="consent" />
        </v-tab-item>

        <v-tab-item value="data">
          <PTabTable ref="data" tab-name="data" />
        </v-tab-item>

        <v-tab-item value="purpose">
          <PTabTable ref="purpose" tab-name="purpose" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PReceiptBtns
      v-if="tab !== 'consent' "
      class="mt-4"
      :disableUndoLastChangeBtn="disableUndoLastChangeBtn"
      @undoLastChange="$refs[tab].loadPreviousState()"
      @submitChanges="$refs['consentNotification'].showNotification($t('snackbar.msg.submission-successful'), 'green')" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          name: 'consent',
          label: this.$t('consent.tab.labels.consent')
        },
        {
          name: 'data',
          label: this.$t('consent.tab.labels.data-category')
        },
        {
          name: 'purpose',
          label: this.$t('consent.tab.labels.purpose')
        }
      ],
      disableUndoLastChangeBtn: true
    }
  },
  mounted() {
    this.$watch(
      "$refs."+this.tab+".states",
      (new_value, old_value) => {
        if(this.$refs[this.tab]){
          this.disableUndoLastChangeBtn = this.$refs[this.tab].states.length === 0
        }else{
          this.disableUndoLastChangeBtn =  false;
        }
      }
    );
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
.v-tab--active {
  color: black !important;
}
</style>
