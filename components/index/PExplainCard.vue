<template>
  <v-card class="d-flex flex-column rounded-xl">

    <v-card class="rounded-circle mx-6 my-3">
      <v-img :src="item.image" />
    </v-card>

    <v-spacer />
    
    <v-card-actions>
      <v-spacer />

      <v-btn 
        v-if="item.to.startsWith('http')"
        :href="item.to"
        target="_blank"
        class="rounded-pill px-5"
      >
        {{ $t(item.title) }}
      </v-btn>

      <v-btn
        v-else 
        :to="item.to"
        class="rounded-pill px-5"
      >
        {{ $t(item.title) }}
      </v-btn>

      <v-spacer />
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      btn: {
        label: "",
        props: {},
      },
      interpolated: {
        we: this.controller.name
      }
    }
  },
}
</script>
