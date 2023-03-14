<template>
  <v-card
    elevation="0"
  >
    <v-card-title class="pa-0 pb-1">
      Glossary
    </v-card-title>

    <v-divider class="py-1" />

    <v-card-text class="pa-0">
      <v-row>
        <v-col class="pb-0">
          <p>Browse through consent-related terms.</p>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col class="fill-height pt-0">
          <v-text-field
            class="rounded-pill"
            v-model="searchValue"
            placeholder="Search for glossary terms Glossary"
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

      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="entry in entries"
          :key="entry.term"
          class="mb-3 rounded-xl"
        >
          <v-expansion-panel-header>

            <template v-slot:actions>
              <v-icon class="icon" left> $expand </v-icon>
            </template>
            
            <span class="header" style="white-space: pre-line">{{
              entry.term
            }}</span>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <span>
              {{ entry.definition }}
            </span>
            <div
              v-if="
                Object.values(entry['references']).length
              "
              class="mt-4 black--text"
            >
              <span class="font-weight-bold">
                {{ $t("qna.links-and-sources") }}:
              </span>
              <ol>
                <li
                  v-for="link in Object.values(
                    entry['references']
                  )"
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
import glossaryEnUS from "../static/data/glossary/glossary-enUS.json";
import glossaryDeDE from "../static/data/glossary/glossary-deDE.json";
import glossaryFrFR from "../static/data/glossary/glossary-frFR.json";
import glossaryItIT from "../static/data/glossary/glossary-itIT.json";

export default {
  data() {
    return {
      glossary: "",
      searchValue: "",
      matchedEntry: "",
      searching: false,
    };
  },
  computed: {
    entries() {
      return Object
        .values(this.glossary.glossaryEntries)
        .filter((e) => {
          return e.term.toLowerCase().includes(this.searchValue.toLowerCase());
        });
    }
  },
  created() {
    if (this.$i18n.locale === "en") {
      this.glossary = glossaryEnUS;
    } else if (this.$i18n.locale === "de") {
      this.glossary = glossaryDeDE;
    } else if (this.$i18n.locale === "it") {
      this.glossary = glossaryItIT;
    } else if (this.$i18n.locale === "fr") {
      this.glossary = glossaryFrFR;
    }
  }
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
