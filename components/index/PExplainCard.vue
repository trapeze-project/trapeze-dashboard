<template>
  <v-card shaped class="d-flex flex-column">
    <img :src="filename" style="width: 100%;" />

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-text>
      {{ content.interpolate(paramsForInterpolation)}}
    </v-card-text>
    <v-spacer></v-spacer>
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
import controller from '../../static/data/controller.json'
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
      btnProps: '',
      paramsForInterpolation:{}
    }
  },
  created () {
    this.paramsForInterpolation = controller.paramsForInterpolation;
    String.prototype.interpolate = function(params) {
      const names = Object.keys(params);
      const values = Object.values(params);
      return new Function(...names, `return \`${this}\`;`)(...values);
    }

    this.calculateButtonProperties()
  },
  methods: {
    calculateButtonProperties () {
      this.btnProps = {};
      if (this.href.startsWith('http')) {
        this.btnLabel = this.$t('btn.labels.visit-website');
        this.btnProps.href = this.href;
        this.btnProps.target="_blank"
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
