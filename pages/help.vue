<template>
  <div>
    <v-card>
      <v-card-title>
        {{ $t("consent.title") }}
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="page" flat>
          <v-stepper-header class="elevation-0">
            <template v-for="(type, index) in dataTypes">
              <v-stepper-step
                :key="`${index}-step`"
                :complete="false"
                :step="index + 1"
              >
                {{ $t("consent." + type) }}
              </v-stepper-step>

              <v-divider
                v-if="index < dataTypes.length - 1"
                :key="`${index}-divider`"
              ></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(type, index) in dataTypes"
              :key="index"
              :step="index + 1"
            >
              <div>
                <div>
                  {{ $t("consent." + type) }}
                </div>

                <v-divider class="my-3" />

                <div class="my-3">
                  {{ $t("consent.text") }}
                </div>

                <p class="font-weight-bold">
                  {{ $t("consent.purpose") }}
                </p>

                <PDataCategoryHelper class="mt-3" :categories="categories" />
              </div>

              <div class="text-center">
                <v-btn
                  class="black--text"
                  color="light"
                  :disabled="page === 1"
                  @click="page--"
                  >Back</v-btn
                >
                <v-btn
                  class="black--text"
                  color="primary"
                  :disabled="page === dataTypes.length"
                  @click="page++"
                  >Next</v-btn
                >
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Helper",
  data() {
    return {
      page: 1,
      dataTypes: ["location", "bank", "credit", "fingerprint", "name"],
      categories: ["Advertising", "Marketing", "Identity Verification"],
    };
  },
};
</script>