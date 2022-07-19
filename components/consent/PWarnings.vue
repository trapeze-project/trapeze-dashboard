<template>
  <div>
    <b class="ml-3">{{ $t('consent.warnings') }}</b>
    <transition-group tag="ul" name="warningsList" appear>
      <li v-for="dataCategory in Object.keys(selectedWarnings)" :key="dataCategory">
        <v-alert
          shaped
          dense
          dark
          prominent
          type="warning"
          class="mx-1"
        >
          <p>{{ $t('consent.warningMsg',{dataCategory:$t(dataCategory) , purpose: $t(purpose) , helperChoices:$t(selectedWarnings[dataCategory]["consentHelperChoice"])}) }}</p>
          <v-spacer />
          <div class="mb-1 float-right">
            <v-btn @click="fixWarnig(dataCategory)">
              {{ $t('btn.labels.fix') }}
            </v-btn>
            <v-btn @click="closeWarnig(dataCategory)">
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
export default {
  props: {
    selectedWarnings: Object,
    purpose: String
  },
  methods: {
    closeWarnig (dataCategory) {
      this.$emit('saveState')
      this.$emit('ignoreWarning', this.purpose, dataCategory)
    },
    closeAllWarnings () {
      this.$emit('saveState')
      for (const dataCategory of Object.keys(this.selectedWarnings)) {
        this.$emit('ignoreWarning', this.purpose, dataCategory)
      }
    },
    fixWarnig (dataCategory) {
      this.$emit('saveState')
      this.$emit('changeUserChoice', this.purpose, dataCategory, false)
    },
    fixAllWarnigs () {
      this.$emit('saveState')
      for (const dataCategory of Object.keys(this.selectedWarnings)) {
        this.$emit('changeUserChoice', this.purpose, dataCategory, false)
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
