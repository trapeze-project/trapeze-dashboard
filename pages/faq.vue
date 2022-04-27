<template>
  <div>
    <h2>
      FREQUENTLY ASKED QUESTIONS
    </h2>
    <v-expansion-panels>
      <v-expansion-panel v-for="category in faq" :key="category.title" class="mb-1">
        <v-expansion-panel-header color="primary">
          <span class="white--text">{{category.title}}</span>
          <template v-slot:actions>
            <v-icon >
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels class="mt-1">
            <v-expansion-panel v-for="inquiry in category.quesitionsANDAnswers" :key="inquiry.question" class="mb-1">
              <v-expansion-panel-header color="primary">
                <span class="white--text">{{inquiry.question}}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="my-5">{{inquiry.answer}}</p>
                <div v-if="inquiry.linksAndSources.length" class="mt-4 grey--text">
                  <span class="font-weight-bold">
                    Links and Sources:
                  </span>
                  <ol>
                    <li v-for="link in inquiry.linksAndSources" :key="link">
                      <a :href="link" class="grey--text">{{link}}</a>
                    </li>
                  </ol>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
</style>
