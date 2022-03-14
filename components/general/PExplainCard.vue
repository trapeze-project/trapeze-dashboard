<template>
  <v-card class="h-100" elevation="5" style="padding: 0px 2px" shaped>
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-img max-height="300px" :src="filename" />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card-title class="text-h6 mb-0" style="max-height: 64px;">
          {{ title }}
        </v-card-title>
        <v-card-text>
          <p class="text-h7 mb-0" style="max-height: 92px;">
            {{ content }}
          </p>
          <slot />
        </v-card-text>
      </v-col>
    </v-row>
    <v-card-actions class="mt-10">
      <v-spacer />
      <v-btn
        width="50%"
        color="primary"
        depressed
        :to="localePath(href)"
      >
        {{ $t('home.explore-btn') }}
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
