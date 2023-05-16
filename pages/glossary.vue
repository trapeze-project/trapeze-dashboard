<template>
  <v-card elevation="0">
    <v-card-title class="pa-0 pb-1">
      {{ $t("nav.labels.glossary") }}
    </v-card-title>

    <v-divider class="py-1" />

    <v-card-text class="pa-0">
      <v-row>
        <v-col class="pb-0">
          <p>{{ $t("glossary.desc") }}</p>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col class="fill-height pt-0">
          <v-text-field
            class="rounded-pill"
            v-model="searchValue"
            :placeholder="$t('placeholder.search-for-glossary')"
            outlined
            dense
            clearable
            append-icon="mdi-magnify"
            @keyup.enter="() => null"
            @click:append="() => null"
            @click:clear="() => null"
          />
        </v-col>
      </v-row>

      <v-expansion-panels inset v-model="openPanel" >
        <v-expansion-panel
          v-for="entry in entries"
          :key="entry.term"
          class="mb-3 rounded-xl"
        >
          <v-expansion-panel-header >
            <template v-slot:actions>
              <v-icon class="icon" left> $expand </v-icon>
            </template>

            <span class="header newline-character-support">
              {{ entry.term }}
            </span>
          </v-expansion-panel-header>

          <v-expansion-panel-content :class="entry.id">
            <!-- first line is always empty -->
            <p class="newline-character-support">
              {{ entry.definition }}
            </p>
            <div
              v-if="Object.values(entry['references']).length"
              class="mt-4 black--text"
            >
              <span class="font-weight-bold">
                {{ $t("qna.links-and-sources") }}:
              </span>
              <ol>
                <li
                  v-for="link in Object.values(entry['references'])"
                  :key="link"
                >
                  <a :href="link" class="black--text">{{ link }}</a>
                </li>
              </ol>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import glossaryEN from "../static/data/glossary/glossary-enUS.json";
import glossaryDE from "../static/data/glossary/glossary-deDE.json";
import glossaryFR from "../static/data/glossary/glossary-frFR.json";
import glossaryIT from "../static/data/glossary/glossary-itIT.json";

export default {
  data() {
    return {
      glossary: {
        en: glossaryEN,
        de: glossaryDE,
        fr: glossaryFR,
        it: glossaryIT,
      },
      searchValue: "",
      searching: false,
      openPanel: null,
    };
  },
  mounted() {
    let hashValue = this.$nuxt.$route.hash.slice(1);
    let entries = Object.values(this.glossary.en["glossaryEntries"]);
    this.openPanel = entries.findIndex((entry) => {
      let entryID = entry.id;
      return hashValue === entryID;
    });
    if (this.openPanel > -1) {
      window.onload = () => {
        this.scrollpage(hashValue);
      };
    }
  },
  computed: {
    entries() {
      return Object.values(
        this.glossary[this.$i18n.locale].glossaryEntries
      ).filter((e) => {
        return e.term.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
  },
  methods: {
    scrollpage(className) {
      document
        .getElementsByClassName(className)[0]
        .scrollIntoView({ behavior: "smooth", block: "center"  });
      // let component = this.$refs[className]
      // console.log(component)
      // component.scrollIntoView({ behavior: "smooth" });


        // const position = document.getElementsByClassName(className)[0].offsetTop;
          // smooth scroll
        // window.scrollTo({ top: position, behavior: "smooth" }); 
    },
  },
};
</script>

<style scoped>
.icon {
  order: 0;
}

.header {
  order: 1;
}

.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border-color: #fff !important;
}
</style>
