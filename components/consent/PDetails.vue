<template>
  <div class="px-1">
    <v-card class="mb-2 rounded-xl" elevation="2">
      <v-container>
        <v-row>
          <v-col :cols="12" class="pa-0">
            <v-card-title
              class="pa-0 pl-5 clickable"
              @click="
                showDetails = !showDetails;
                max = 10;
              "
            >
              <v-row>
                <v-col cols="1">
                  <v-switch
                    v-if="showSwitches"
                    inset
                    v-model="parentSwitchValue"
                    @change="changeParentValue"
                  />
                </v-col>
                <v-col cols="10">
                  <div class="ml-3 me-auto ma-3">
                    <div>
                      {{ fetched_DPV_Labels_descriptions[$i18n.locale].labels[this.parent] }}
                    </div>
                    <div class="text-caption">{{ this.usedBy }}</div>
                  </div>
                </v-col>
                <v-col cols="1">
                  <div class="mr-3 mt-2">
                    <v-icon v-if="showDetails"> mdi-chevron-up </v-icon>
                    <v-icon v-else> mdi-chevron-down </v-icon>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>

            <v-expand-transition>
              <div v-show="showDetails" class="pa-3">
                <v-row>
                  <v-col class="fill-height pb-0">
                    <v-text-field
                      class="rounded-pill"
                      v-model="searchValue"
                      :placeholder="$t('placeholder.search-for-' + sub)"
                      outlined
                      dense
                      clearable
                      append-icon="mdi-magnify"
                      @keyup.enter="max = 10"
                      @click:append="max = 10"
                      @click:clear="
                        searchValue = '';
                        max = 10;
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    class="fill-height pb-0"
                    v-if="this.slicedChildren.length !== 1"
                  >
                    <v-select
                      v-model="selectedSortOption"
                      :items="sortOptions"
                      label="Sort By"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    class="pa-3 pt-0"
                    cols="12"
                    sm="6"
                    lg="4"
                    xl="3"
                    v-for="child in slicedChildren.slice(0, this.max)"
                    :key="child"
                  >
                    <v-card
                      class="fill-height rounded-xl"
                      outlined
                      elevation="0"
                    >
                      <v-card-title class="flex-nowrap">
                        <v-switch
                          v-if="showSwitches"
                          inset
                          v-model="ChildrenSwitchesValues[child]"
                          @change="changeUserChoice(child)"
                        />
                        <small>{{ fetched_DPV_Labels_descriptions[$i18n.locale].labels[child] }}</small>
                      </v-card-title>

                      <v-card-text>
                        {{ fetched_DPV_Labels_descriptions[$i18n.locale].descriptions[child] }}
                        <div>
                          rights:
                          <ul>
                            <li
                              v-for="subject in subjects"
                              :key="subject"
                              class="clickable"
                              style="color:blue; text-decoration: underline"
                              @click="openControllerForm(subject)"
                            >
                              {{subject}}
                            </li>
                          </ul>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <div
                  v-if="max < children.length"
                  class="d-flex justify-center mt-3"
                >
                  <v-btn
                    class="my-2 black--text"
                    color="primary"
                    @click="() => (max += max)"
                  >
                    {{ $t("btn.labels.load-more") }}
                  </v-btn>
                </div>

                <!-- Recipients -->
                <!-- Storage -->
                <!--
                <v-card class="my-6 rounded-xl" outlined elevation="0">
                  <v-card-title> Recipients other than cloverIT: </v-card-title>
                </v-card>

                <v-card class="my-6 rounded-xl" outlined elevation="0">
                  <v-card-title> Storage Duration </v-card-title>
                </v-card>
                -->

                <!-- Sensitivity -->
                <v-card
                  v-if="tabName === 'data' && showSwitches === true"
                  class="my-3 rounded-xl"
                  outlined
                  elevation="0"
                >
                  <v-card-title>
                    {{ $t("consent.sensitivity") }}
                  </v-card-title>

                  <v-card-text>
                    {{ $t("consent.sensitivityText") }}
                  </v-card-text>

                  <v-card-text>
                    <PSensitivity />
                  </v-card-text>
                </v-card>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>


import emailTemplateEN from  "../../static/data/emailTemplates/emailTemplate-enUS.json";
import emailTemplateDE from  "../../static/data/emailTemplates/emailTemplate-deDE.json";
import emailTemplateFR from  "../../static/data/emailTemplates/emailTemplate-frFR.json";
import emailTemplateIT from  "../../static/data/emailTemplates/emailTemplate-itIT.json";


export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ["data", "purpose"].includes(value);
      },
    },
    parent: {
      type: String,
      required: true,
    },
    children: {
      type: Array,
      required: true,
    },
    subTree: {
      type: Object,
      required: false,
    },
    showSwitches: {
      type: Boolean,
      required: false,
      default: true,
    },
    openControllerForm:{
      type:Function
    },
    fetched_DPV_Labels_descriptions:{
      type: Object,
      required: false,
    }
  },

  data() {
    return {
      parentSwitchValue: false,
      ChildrenSwitchesValues: {},
      showDetails: false,
      userChoices: {},
      searchValue: "",
      max: 10,
      sortOptions: [
        { text: 'Alphabetical Ascending', value: 'alpha-ascending' },
        { text: 'Alphabetical Descending', value: 'alpha-descending' },
        { text: 'Sensitivity Ascending', value: 'sensitive-ascending', disabled: true },
        { text: 'Sensitivity Descending', value: 'sensitive-descending', disabled: true },
      ],
      emailTemplate: {
        "en": emailTemplateEN,
        "de": emailTemplateDE,
        "it": emailTemplateIT,
        "fr": emailTemplateFR
      }
    };
  },
  computed: {
    subjects() {
      return this.emailTemplate[this.$i18n.locale].map((e) => e.subject);
    },
    slicedChildren() {
      return this.children.filter((e) => {
        let label = this.fetched_DPV_Labels_descriptions[this.$i18n.locale].labels[e].toLowerCase();
        return label.includes(this.searchValue ? this.searchValue : "");
      });
    },

    sub() {
      return this.tabName === "data" ? "purpose" : "data";
    },
    usedBy() {
      let text =
        this.tabName === "data"
          ? this.$t("consent.used-for")
          : this.$t("consent.uses");
      text += ": ";
      this.children.forEach((IRI, index) => {
        text += `${index + 1}-${this.fetched_DPV_Labels_descriptions[this.$i18n.locale].labels[IRI]} `;
      });

      return text;
    },
  },

  async created() {
    this.selectedSortOption = "alpha-ascending";
    if (this.showSwitches) {
      this.ChildrenSwitchesValues = Object.assign({}, this.subTree);
      this.parentSwitchValue = Object.values(
        this.ChildrenSwitchesValues
      ).includes(true)
        ? true
        : false;
    }
  },
  

  methods: {
    changeUserChoice(child) {
      if (
        Object.values(this.ChildrenSwitchesValues).every(
          (currentValue) => currentValue === false
        )
      ) {
        this.parentSwitchValue = false;
      } else {
        this.parentSwitchValue = true;
      }
      this.$emit(
        "changeUserChoice",
        this.parent,
        child,
        this.ChildrenSwitchesValues[child]
      );
    },

    changeParentValue(value) {
      for (const child in this.ChildrenSwitchesValues) {
        this.ChildrenSwitchesValues[child] = value;
        this.changeUserChoice(child);
      }
    },
  },
};
</script>
