<template>
  <div>
    <v-card>
      <v-card-title> Frequently Asked Questions </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="7">
            <p>
              Find out more about the TRAPEZE privacy dashboard and its
              underlying concepts.Do not forget to let us know if you cannot
              find information you are interested in.
            </p>
          </v-col>
          <v-col cols="5" align="right">
            <v-btn class="black--text" color="primary" depressed>
              I cannot find an answer
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="mb-5" />

        <v-row align="center" justify="center">
          <v-col class="fill-height">
            <v-text-field
              placeholder="Search for a question or an answer"
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
                <v-icon class="icon"> $expand </v-icon>
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
                      <v-icon class="icon" left> $expand </v-icon>
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
                      <span class="font-weight-bold"> Links and Sources: </span>
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
import faq from "../static/data/faq.json";

export default {
  name: "Faq",
  data() {
    return {
      faq: faq,
    };
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
