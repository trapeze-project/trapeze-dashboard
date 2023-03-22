<template>
  <v-card class="d-flex flex-column rounded-xl">

    <v-card class="rounded-circle mx-6 my-3">
      <v-img :src="filename" />
    </v-card>

    <v-spacer />
    
    <v-card-actions>
      <v-spacer />

      <v-btn :to="href" class="rounded-pill px-5">
        {{ this.title }}
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
      default: () => { }
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    content: {
      type: String,
      required: true,
      default: ""
    },
    filename: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
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
