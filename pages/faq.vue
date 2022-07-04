<template>
  <div>
    <v-card>
      <v-card-title> {{ $t("qna.header") }} </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <p> {{ $t("qna.introduction") }} </p>
          </v-col>
        </v-row>

        <v-divider class="mb-5" />

        <v-row align="center" justify="center">
          <v-col class="fill-height">
            <v-text-field
              :placeholder="$t('placeholder.search-for-a-question-or-an-answer')"
              outlined
              dense
              append-icon="mdi-magnify"
              @click:append="() => {}"
            />
          </v-col>
        </v-row>

        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="category in faq"
            :key="category.title"
            class="mb-1"
          >
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-icon class="icon">
                  $expand
                </v-icon>
              </template>
              <span class="header">{{ category.title }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="inquiry in category.qna"
                  :key="inquiry.question"
                >
                  <v-expansion-panel-header>
                    <template v-slot:actions>
                      <v-icon class="icon" left>
                        $expand
                      </v-icon>
                    </template>
                    <span class="header">{{
                      inquiry.question
                    }}</span>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <p>
                      {{ inquiry.answer }}
                    </p>
                    <div
                      v-if="inquiry.references.length"
                      class="mt-4 black--text"
                    >
                      <span class="font-weight-bold"> {{ $t("qna.links-and-sources") }}: </span>
                      <ol>
                        <li v-for="link in inquiry.references" :key="link">
                          <a :href="link" class="black--text">{{ link }}</a>
                        </li>
                      </ol>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import faq from '../static/data/faq.json'

export default {
  name: 'Faq',
  data () {
    return {
      faq
    }
  }
}
</script>

<style scoped>
.icon {
  order: 0;
}

.header {
  order: 1;
}

</style>
