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
          :title="$t(item.title)"
          :content="$t(item.content)"
          :filename="item.filename"
          :href="item.to"
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
          "filename": "/img/home-icon-data.svg",
          "link": "/consent?tab=data",
          "content": "home.explain-card.data.content",
          "to": this.localePath(
            "/" + this.controller["@id"] + "/data"
          )
        }, {
          "title": "home.explain-card.purpose.title",
          "filename": "/img/home-icon-purpose.svg",
          "link": "/consent?tab=purpose",
          "content": "home.explain-card.purpose.title",
          "to": this.localePath(
            "/" + this.controller["@id"] + "/purpose"
          )
        }, {
          "title": "home.explain-card.trapeze.title",
          "filename": "/img/home-icon-trapeze.svg",
          "link": "http://trapeze-project.eu",
          "content": "home.explain-card.trapeze.title",
          "to": "https://trapeze-project.eu/"
        }, {
          "title": "home.explain-card.glossary.title",
          "filename": "/img/home-icon-glossary.svg",
          "link": "/glossary",
          "content": "home.explain-card.glossary.title",
          "to": this.localePath(
            "/glossary"
          )
        }, {
          "title": "home.explain-card.faq.title",
          "filename": "/img/home-icon-faq.svg",
          "link": "/faq",
          "content": "home.explain-card.faq.title",
          "to": this.localePath(
            "/" + this.controller["@id"] + "/faq"
          )
        }
      ],
    };
  },
  mounted() {
  }
}
</script>
