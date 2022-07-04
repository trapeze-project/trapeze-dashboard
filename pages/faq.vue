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
              clearable
              append-icon="mdi-magnify"
              v-model="userQuestion"
              @click:append="search"
              v-on:keyup.enter="search"
            >
            </v-text-field>
          </v-col>
        </v-row>
        
        <v-card v-if="searching">
          <v-card-title>{{this.matchedQNA.question}}</v-card-title>
          <v-card-text>
            <div>{{this.matchedQNA.answer}}</div>
          </v-card-text>
          <v-card-actions>
            <ol>
                <div class="text--primary" v-show="matchedQNA.references.length"> {{$t("qna.links-and-sources")}}: </div>
                <li v-for="link in matchedQNA.references" :key="link">
                  <a :href="link" class="black--text">{{ link }}</a>
                </li>
            </ol>
          </v-card-actions>
        </v-card>



        <v-expansion-panels accordion v-if="!searching">
          <v-expansion-panel
            v-for="category in Object.keys(this.faq)"
            :key="category"
            class="mb-1"
          >
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-icon class="icon">
                  $expand
                </v-icon>
              </template>
              <span class="header">{{ category }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="inquiry in faq[category]['qna']"
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
                      <span class="font-weight-bold" v-show="inquiry.references.length"> {{$t("qna.links-and-sources")}}: </span>
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
import faqEnUS from "../static/data/faq-enUS.json";
import faqDeDE from "../static/data/faq-deDE.json";
import faqItIT from "../static/data/faq-itIT.json";
import faqFrFR from "../static/data/faq-frFR.json";


export default {
  name: 'Faq',
  data () {
    return {
      faq: "",
      userQuestion:"",
      matchedQNA:"",
      searching:false

    };
  },
  created(){
    if(this.$i18n.locale === 'en'){
      this.faq  = faqEnUS
    }else if(this.$i18n.locale === 'de'){
      this.faq  =faqDeDE
    }else if(this.$i18n.locale === 'it'){
      this.faq  =faqItIT
    }else if(this.$i18n.locale === 'fr'){
      this.faq  =faqFrFR
    }
  },
  watch: {
    userQuestion(newuserQuestion, olduserQuestion) {
      if (!newuserQuestion) {
        this.searching = false;
      }
    }
  },
  methods:{
    search(){
      let keywords = this.userQuestion.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(" ");
      let modfaq = []
      for (const category of Object.keys(this.faq)){
        for(const qna of this.faq[category]["qna"]){
          let matchedKeywords = 0;
          for(const keyword of keywords){
            if(qna["question"].toLowerCase().includes(keyword.toLowerCase()) || qna["answer"].toLowerCase().includes(keyword.toLowerCase())){
              matchedKeywords++;
            }
          }
          [qna ,matchedKeywords]
          modfaq.push([qna ,matchedKeywords])
        }
      }
      modfaq.sort(function(a, b) {
          return b[1] - a[1];
      });
      this.matchedQNA = modfaq[0][0]
      this.searching = true;
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
</style>
