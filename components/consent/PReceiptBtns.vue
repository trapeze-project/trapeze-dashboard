<template>
  <div class="float-right">
    <v-btn class="white--text" color="red" @click="undoChanges">
      {{ $t("btn.labels.undo-changes") }}
    </v-btn>
    <!-- <v-btn class="mx-3">{{$t("btn.labels.see-changes")}}</v-btn> -->
    <v-btn class="black--text" color="primary" @click="submitChanges">
      {{ $t("btn.labels.submit-changes") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    undoChanges () {
      this.$emit('undoChanges')
    },
    submitChanges () {
      this.$emit('submitChanges')
    }

  }
}
</script>
