<template>
  <div>
    <b class="ml-3">{{ $t('consent.warnings') }}</b>
    <transition-group tag="ul" name="warningsList" appear class="pl-0">
      <li v-for="child in Object.keys(selectedWarnings)" :key="child">
        <v-alert
          id="issues"
          shaped
          dense
          dark
          prominent
          type="warning"
          class="mx-1"
        >
          <p v-if="tabName == 'purpose' && selectedWarnings[child]['consentHelperChoice'] == 'consent-helper.no-opinion'">
            {{ $t('consent.warning-msg-no-opinion').interpolate(params($t(child), $t(parent))) }}
          </p>
          <p v-else-if="tabName == 'purpose' && selectedWarnings[child]['consentHelperChoice'] == 'consent-helper.not-comfortable'">
            {{ $t('consent.warning-msg-not-comfortable').interpolate(params($t(child), $t(parent))) }}
          </p>
          <p v-if="tabName == 'data' && selectedWarnings[child]['consentHelperChoice'] == 'consent-helper.no-opinion'">
            {{ $t('consent.warning-msg-no-opinion').interpolate(params($t(parent), $t(child))) }}
          </p>
          <p v-else-if="tabName == 'data' && selectedWarnings[child]['consentHelperChoice'] == 'consent-helper.not-comfortable'">
            {{ $t('consent.warning-msg-not-comfortable').interpolate(params($t(parent), $t(child))) }}
          </p>
          <v-spacer />
          <div class="mb-1 float-right">
            <v-btn @click="fixWarnig(child)">
              {{ $t('btn.labels.fix') }}
            </v-btn>
            <v-btn @click="closeWarnig(child)">
              {{ $t('btn.labels.ignore') }}
            </v-btn>
          </div>
        </v-alert>
      </li>
    </transition-group>
    <div class="float-right">
      <v-btn class="white--text " color="red" @click="fixAllWarnigs">
        {{ $t('btn.labels.fix-all') }}
      </v-btn>
      <v-btn class="black--text " color="primary" @click="closeAllWarnings">
        {{ $t('btn.labels.ignore-all') }}
      </v-btn>
    </div>
    <br>
  </div>
</template>

<script>
import controller from '../../static/data/controller.json'
export default {
  props: {
    selectedWarnings: Object,
    parent: String,
    tabName: String
  },
  data () {
    return {
      paramsForInterpolation: {}
    }
  },
  created () {
    this.paramsForInterpolation = controller.paramsForInterpolation
  },
  methods: {
    params (dataCategory, purpose) {
      return {
        dataCategory,
        purpose,
        we: this.paramsForInterpolation.we
      }
    },
    closeWarnig (child) {
      this.$emit('saveState')
      this.$emit('ignoreWarning', this.parent, child)
    },
    closeAllWarnings () {
      this.$emit('saveState')
      for (const child of Object.keys(this.selectedWarnings)) {
        this.$emit('ignoreWarning', this.parent, child)
      }
    },
    fixWarnig (child) {
      this.$emit('saveState')
      this.$emit('changeUserChoice', this.parent, child, false)
    },
    fixAllWarnigs () {
      this.$emit('saveState')
      for (const child of Object.keys(this.selectedWarnings)) {
        this.$emit('changeUserChoice', this.parent, child, false)
      }
    }
  }
}
</script>

<style scoped>
ul{
  position: relative;
  list-style-type: none;
}
ul li:first-child{
  margin-top: 4px;
}

.warningsList-enter , .warningsList-leave-to{
  opacity: 0;
  transform: scale(0.6);
}
.warningsList-enter-to{
  opacity: 1;
  transform: scale(1);
}
.warningsList-enter-active{
  transition: all 0.5s ease;
}
.warningsList-leave-active{
  transition: all 0.5s ease;
  position: absolute;
}
.warningsList-move{
  transition: all 0.4s ease;
}

</style>
