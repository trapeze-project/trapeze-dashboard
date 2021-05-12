<template>
  <v-card elevation="5" style="padding: 0px 2px" shaped>
    <v-row>
      <v-col cols="12" lg="6" md="12" sm="12">
        <v-img :src="filename" />
      </v-col>
      <v-col cols="12" lg="6" md="12" sm="12">
        <v-card-title>{{ title }}</v-card-title>
        <v-divider inset />
        <br>
        <v-card-text>
          <p>{{ content }}</p>
          <slot />
        </v-card-text>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :to="href"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title'
    },
    content: {
      type: String,
      required: true,
      default: 'Content'
    },
    filename: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  }
}
</script>
