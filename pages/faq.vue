<template>
  <div>
    <h2>
      FREQUENTLY ASKED QUESTIONS
    </h2>
    <v-card>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="9">
            <div>find out more about the TRAPEZE privacy dashboard and its underlying concepts.</div>
            <div>Do not forget to let us kknow if you cannot find information you are interested in.</div>
          </v-col>
          <v-col cols="3">
            <v-btn class="custom-transform-class text-none blue white--text" depressed>
              I Cannot find an Answer
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
      </v-container>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="7" />
          <v-col cols="4">
            <v-text-field
              placeholder="Describe what you are curious about."
              outlined
              dense
            />
          </v-col>
          <v-col cols="1">
            <v-btn depressed class="transparent">
              <v-icon color="blue">
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="category in faq" :key="category.title" class="mb-1">
          <v-expansion-panel-header color="primary">
            <template v-slot:actions>
              <v-icon class="icon">
                $expand
              </v-icon>
            </template>
            <span class="white--text header">{{ category.title }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-expansion-panels class="mt-1">
              <v-expansion-panel v-for="inquiry in category.quesitionsANDAnswers" :key="inquiry.question" class="mb-1">
                <v-expansion-panel-header color="primary">
                  <template v-slot:actions>
                    <v-icon class="icon" left>
                      $expand
                    </v-icon>
                  </template>
                  <span class="white--text header">{{ inquiry.question }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p class="my-5">
                    {{ inquiry.answer }}
                  </p>
                  <div v-if="inquiry.linksAndSources.length" class="mt-4 grey--text">
                    <span class="font-weight-bold">
                      Links and Sources:
                    </span>
                    <ol>
                      <li v-for="link in inquiry.linksAndSources" :key="link">
                        <a :href="link" class="grey--text">{{ link }}</a>
                      </li>
                    </ol>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Faq',
  data () {
    return {
      faq: []
    }
  },
  mounted () {
    this.faq.push({ title: 'TRAPEZE', quesitionsANDAnswers: [{ question: 'What is TRAPEZE?', answer: 'TRAPEZE is a research project funded by the European Union. TRAPEZE is an acronym for Transparency, Privacy and Security for European citizens. TRAPEZE is part of the Horizon2020 funding programm', linksAndSources: ['http://trapeze-project.eu/', 'https://ec.europa.eu/info/research-and-innovation/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-2020_en'] }, { question: 'Which institutions are part of TRAPEZE?', answer: '', linksAndSources: [] }, { question: 'who hosts this dashboard?', answer: '', linksAndSources: [] }] })
    this.faq.push({ title: 'Consent', quesitionsANDAnswers: [] })
    this.faq.push({ title: 'Personal Data', quesitionsANDAnswers: [] })
    this.faq.push({ title: 'Purposes', quesitionsANDAnswers: [] })
    this.faq.push({ title: 'Consent Helper', quesitionsANDAnswers: [] })
    this.faq.push({ title: 'Glossary', quesitionsANDAnswers: [] })
  }
}
</script>

<style scoped>
a{
  text-decoration:none;
}
.icon {
  order: 0;
}

.header {
  order: 1;
}
</style>
