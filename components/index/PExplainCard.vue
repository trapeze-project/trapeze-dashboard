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
      <v-btn v-bind="btnProps">
        {{ this.btnLabel}}
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
  },
  data () {
    return {
      btnLabel: '',
      btnProps: ''
    }
  },
  created () {
    this.calculateButtonProperties()
  },
  methods: {
    calculateButtonProperties () {
      this.btnProps = {};
      if (this.href.startsWith('http')) {
        this.btnLabel = this.$t('btn.labels.visit-website');
        this.btnProps.href = this.href;
      } else {
        this.btnLabel = this.$t('btn.labels.view');
        this.btnProps.to = this.localePath(this.href);
      }
      this.btnProps.depressed = true
      this.btnProps.class = 'black--text'
      this.btnProps.color = 'primary'
    }
  }
}
</script>
