<template>
  <div class="float-right">
    <v-btn class="white--text" :disabled="disableUndoLastChangeBtn" color="red" @click="undoLastChange">
      {{ $t("btn.labels.undo-last-change") }}
    </v-btn>
    <!-- <v-btn class="mx-3">{{$t("btn.labels.see-changes")}}</v-btn> -->
    <v-btn class="black--text" color="primary" @click="submitChanges">
      {{ $t("btn.labels.submit-changes") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    disableUndoLastChangeBtn: {
      type: Boolean,
    }
  },
  methods: {
    undoLastChange () {
      this.$emit('undoLastChange')
    },
    submitChanges () {
      this.$emit('submitChanges')
    }

  }
}
</script>
