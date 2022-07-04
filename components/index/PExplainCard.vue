<template>
  <v-card shaped>
    <v-img max-height="300px" :src="filename" />

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-text>
      {{ content }}
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn class="black--text" color="primary" depressed :to="localePath(href)">
        {{ $t("home.explore-btn") }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "Title",
    },
    content: {
      type: String,
      required: true,
      default: "Content",
    },
    filename: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
