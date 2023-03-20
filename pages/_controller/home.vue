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
          :href="item.link"
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
          "filename": "/img/data.png",
          "link": "/consent?tab=data",
          "content": "home.explain-card.data.content"
        }, {
          "title": "home.explain-card.data.title",
          "filename": "/img/purpose.png",
          "link": "/consent?tab=purpose",
          "content": "home.explain-card.data.title"
        }, {
          "title": "home.explain-card.data.title",
          "filename": "/img/favicon.png",
          "link": "http://trapeze-project.eu",
          "content": "home.explain-card.data.title"
        }, {
          "title": "home.explain-card.glossary.title",
          "filename": "/img/data.png",
          "link": "/glossary",
          "content": "home.explain-card.glossary.title"
        }, {
          "title": "home.explain-card.faq.title",
          "filename": "/img/data.png",
          "link": "/faq",
          "content": "home.explain-card.faq.title"
        }
      ],
    };
  },
  mounted() {
  }
}
</script>
