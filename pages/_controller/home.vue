<template>
  <div id="index" class="mt-3">
    <v-row justify="center" align="center">
      <v-col>
        <PWlcmMsg
          :controller="controller"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, idx) in items"
        :key="idx"
        cols="6"
        sm="4"
        md="4"
        lg="3"
      >
        <PExplainCard
          class="fill-height"
          :controller="controller"
          :item="item"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
    }
  },
  data() {
    return {
      items: [
        {
          "title": "home.explain-card.data.title",
          "image": "/img/home-icon-data.svg",
          "content": "home.explain-card.data.content",
          "to": `/${this.$i18n.locale}/${this.controller["@id"]}/consent?tab=data`
        }, {
          "title": "home.explain-card.purpose.title",
          "image": "/img/home-icon-purpose.svg",
          "content": "home.explain-card.purpose.title",
          "to": `/${this.$i18n.locale}/${this.controller["@id"]}/consent?tab=purpose`
        }, {
          "title": "home.explain-card.trapeze.title",
          "image": "/img/home-icon-trapeze.svg",
          "content": "home.explain-card.trapeze.title",
          "to": "https://trapeze-project.eu/"
        }, {
          "title": "home.explain-card.glossary.title",
          "image": "/img/home-icon-glossary.svg",
          "content": "home.explain-card.glossary.title",
          "to": `/${this.$i18n.locale}/glossary`
        }, {
          "title": "home.explain-card.faq.title",
          "image": "/img/home-icon-faq.svg",
          "content": "home.explain-card.faq.title",
          "to": `/${this.$i18n.locale}/faq`
        }
      ],
    };
  },
  mounted() {
  }
}
</script>
