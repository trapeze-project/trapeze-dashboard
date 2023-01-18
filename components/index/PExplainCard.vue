<template>
  <v-card shaped class="d-flex flex-column">
    <img :src="filename" style="width: 100%;">

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-text>
      {{ content.interpolate(interpolated) }}
    </v-card-text>
    <v-spacer />
    <v-card-actions>
      <v-spacer />
      <v-btn v-bind="btn.props">
        {{ this.btn.label }}
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
  data () {
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
  created () {
    this.link()
  },
  methods: {
    link() {
      if (this.href.startsWith("http")) {
        this.btn.label = this.$t("btn.labels.visit-website")
        this.btn.props.href = this.href ;
        this.btn.props.target = "_blank"
      } else {
        this.btn.label = this.$t("btn.labels.view");
        this.btn.props.to = this.localePath(
          "/" + this.controller["@id"] + this.href
        )
      }

      this.btn.props.depressed = true
      this.btn.props.class = "black--text"
      this.btn.props.color = "primary"
    }
  }
}
</script>
