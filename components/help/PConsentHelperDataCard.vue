<template>
  <div>
    <v-card class="mr-2">
      <v-card-title>
        {{ categoryName }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t("consent.text_ad") }} You have selected {{ categoryName }} [learn
        more]
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    categoryName: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>