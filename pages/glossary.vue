<template>
  <div>
    <v-card>
      <v-card-title> Glossary </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <p style="color: black">Browse through consent-related terms.</p>
          </v-col>
        </v-row>
				
				

        <v-divider class="mb-5" />

        <v-row align="center" justify="center">
          <v-col class="fill-height">
            <v-text-field
              v-model="searchInput"
              placeholder="Search for glossary terms Glossary"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @click:append="search"
              @keyup.enter="search"
            />
          </v-col>
        </v-row>

				<v-card v-if="searching">
					<v-card-title> {{this.matchedTerm}}</v-card-title>
					<v-card-text> {{this.glossary['terms'][this.matchedTerm]['definition']}}</v-card-text>
				</v-card>



        <v-expansion-panels v-if="!searching" accordion >
          <v-expansion-panel v-for="term in Object.keys(this.glossary.terms)" :key="term" class="mb-1">
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-icon class="icon" left> $expand </v-icon>
              </template>
              <span class="header" style="white-space: pre-line"
                >{{term}}</span
              >
            </v-expansion-panel-header>
            <v-expansion-panel-content>
							{{glossary['terms'][term]['definition']}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import glossaryEnUS from '../static/data/glossary/glossary-enUS.json'
import glossaryDeDE from '../static/data/glossary/glossary-deDE.json'
import glossaryFrFR from '../static/data/glossary/glossary-frFR.json'
import glossaryItIT from '../static/data/glossary/glossary-itIT.json'


export default {
  data() {
    return {
			glossary:'',
      searchInput: "",
			matchedTerm:"",
			searching :false
    };
  },
	  created () {
    if (this.$i18n.locale === 'en') {
      this.glossary = glossaryEnUS
    } else if (this.$i18n.locale === 'de') {
      this.glossary = glossaryDeDE
    } else if (this.$i18n.locale === 'it') {
      this.glossary = glossaryItIT
    } else if (this.$i18n.locale === 'fr') {
      this.glossary = glossaryFrFR
    }
  },
	watch: {
    searchInput (newSearchInput, oldSearchInput) {
      if (!newSearchInput) {
        this.searching = false
      }
    }
  },
  methods: {
    search() {

			for(const term of Object.keys(this.glossary.terms)){
				if(term.toLowerCase() === this.searchInput.toLowerCase()){
					this.matchedTerm = term;
					this.searching = true;
					break;
				}
			}
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
</style>
