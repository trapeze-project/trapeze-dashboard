<template>
  <div>
    <v-card elevation="0">
      <!-- Title -->
      <v-card-title class="d-flex pa-0 pb-1">
        <span>{{$t('otherLegalBases.other-legal-bases')}}</span>
        <v-spacer></v-spacer>
        <v-select
          style="maxWidth: 120px"
          v-model="groupBy"
          :label="$t('otherLegalBases.group-by')"
          :items="groupByOptions"
        ></v-select>
      </v-card-title>

      <v-divider />

      <!-- Description -->
      <v-card-text class="pa-0 my-3"> {{$t('otherLegalBases.titleDescription')}}</v-card-text>

      <!-- Content -->
      <v-container class="pa-0">
        <!-- Search field -->
        <v-row>
          <v-col class="fill-height">
            <v-text-field
              class="rounded-pill"
              v-model="searchValue"
              :placeholder="$t('placeholder.search-for-'+groupBy)"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @keyup.enter="resetMaxDisplayValues"
              @click:append="resetMaxDisplayValues"
              @click:clear="resetMaxDisplayValues"
            />
          </v-col>
        </v-row>

        <!-- Data / Purposes -->
        <div>
          <div v-for="legalBasis in legalBases" :key="legalBasis">
            <p v-show="parents[legalBasis].length !== 0">{{ $t('otherLegalBases.legal-bases.'+lablelFromIRI(legalBasis) )  }}</p>
            <div
              v-for="parent in parents[legalBasis].slice(0, max[legalBasis])"
              :key="parent"
            >
              <PDetails
                tabName="data"
                :parent="parent"
                :children="map[legalBasis][parent]"
                :showSwitches="false"
              />
            </div>

            <div
              v-if=" max[legalBasis] < parents[legalBasis].length"
              class="d-flex justify-center"
            >
              <v-btn
                class="my-2 black--text rounded-pill"
                color="primary"
                @click="max[legalBasis] += max[legalBasis]"
              >
                {{ $t("btn.labels.load-more") }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </v-card>

  </div>
</template>

<script>
import PolicyService from "~/modules/PolicyService";
import DPV_Labels_descriptions_deDE from "~/static/data/DPV/DPV_Labels_descriptions-deDE.json";
import DPV_Labels_descriptions_enUS from "~/static/data/DPV/DPV_Labels_descriptions-enUS.json";
import DPV_Labels_descriptions_frFR from "~/static/data/DPV/DPV_Labels_descriptions-frFR.json";
import DPV_Labels_descriptions_itIT from "~/static/data/DPV/DPV_Labels_descriptions-itIT.json";

export default {
  props: {
    controller: {
      type: Object,
    },
  },
  data() {
    return {
      groupBy: "data",
      groupByOptions: ["data", "purpose"],
      searchValue: "",
      max: {
        "dpv-gdpr:A6-1-b": 4,
        "dpv-gdpr:A6-1-d": 4,
        "dpv-gdpr:A6-1-c": 4,
      },
      mapGroupedByData: {},
      mapGroupedByPurpose: {},
      legalBases: [],
      Imported_DPV_Labels_descriptions: {
        en: DPV_Labels_descriptions_enUS,
        de: DPV_Labels_descriptions_deDE,
        it: DPV_Labels_descriptions_itIT,
        fr: DPV_Labels_descriptions_frFR,
      },
    };
  },
  created() {
    let policy = PolicyService.get(this.controller);
    this.mapGroupedByData = policy.getOtherLegalBasesMap(
      "dpv:hasPersonalDataCategory",
      "dpv:hasPurpose"
    );
    this.mapGroupedByPurpose = policy.getOtherLegalBasesMap(
      "dpv:hasPurpose",
      "dpv:hasPersonalDataCategory"
    );
    this.legalBases = Object.keys(this.mapGroupedByData);
  },
  computed: {
    map() {
      if (this.groupBy === "data") {
        return this.mapGroupedByData;
      } else if (this.groupBy === "purpose") {
        return this.mapGroupedByPurpose;
      }
			
    },
    DPV_Labels_descriptions() {
      return this.Imported_DPV_Labels_descriptions[this.$i18n.locale];
    },
    parents() {
      let result = {};
      Object.keys(this.map).forEach((legalBasis) => {
        result[legalBasis] = Object.keys(this.map[legalBasis]).filter((e) => {
          let label = this.DPV_Labels_descriptions.labels[e].toLowerCase();
          return label
            .toLowerCase()
            .includes(this.searchValue ? this.searchValue : "");
        });
      }, {});
      return result;
			
    },
  },
  methods: {
    resetMaxDisplayValues() {
      Object.keys(this.max).forEach((legalBasis) => {
        this.max[legalBasis] = 4;
      });
      this.$forceUpdate();
    },
    lablelFromIRI(IRI){
      return IRI.split(':')[1]
    }
  },
};
</script>
