<template>
  <div>
    <v-card elevation="0">
      <!-- Title -->
      <v-card-title class="d-flex pa-0 pb-1">
        <span>{{$t('otherLegalBases.other-legal-bases')}}</span>
      </v-card-title>

      <v-divider />

      <!-- Description -->
      <v-card-text class="pa-0 my-3"> {{$t('otherLegalBases.titleDescription')}}</v-card-text>

      <!-- Content -->
      <v-container class="pa-0">
        <!-- Search field -->
        <v-row>
          <v-col 
            cols="6"
            sm="8"
            md="9" 
            class="fill-height"
          >

            <v-text-field
              class="rounded-pill"
              v-model="searchValue"
              :placeholder="$t('placeholder.search-for-' + placeholderKey)"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @keyup.enter="resetMaxDisplayValues"
              @click:append="resetMaxDisplayValues"
              @click:clear="resetMaxDisplayValues"
            />
          </v-col>

          <v-col 
            align="right"
            cols="6"
            sm="4"
            md="3"
          >
            <v-select
              class="rounded-pill"
              outlined
              dense
              v-model="groupBy"
              :label="$t('otherLegalBases.group-by')"
              :items="groupByOptions"
            ></v-select>

          </v-col>
        </v-row>

        <!-- Data / Purposes -->
        <div>
          <div 
            v-for="legalBasis in legalBases" 
            :key="legalBasis"
            class="mb-5"
          >
            <v-card-title
              v-show="parents[legalBasis].length !== 0"
            >
              {{ $t('otherLegalBases.legal-bases.' + labelFromIRI(legalBasis)) }}
            </v-card-title>

            <div
              v-for="parent in parents[legalBasis].slice(0, max)"
              :key="parent"
            >
              <PDetails
                tabName="data"
                :parent="parent"
                :children="map[legalBasis][parent]"
                :showSwitches="false"
                :fetched_DPV_Labels_descriptions="dpv"
              />
            </div>

            <div
              v-if=" max < parents[legalBasis].length"
              class="d-flex justify-center"
            >
              <v-btn
                class="my-2 black--text rounded-pill"
                color="primary"
                @click="max += max"
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
let PolicyService = require("~/modules/PolicyService");

import dpvLabelsDescriptionsEN from "~/static/data/DPV/DPV_Labels_descriptions-enUS.json";
import dpvLabelsDescriptionsDE from "~/static/data/DPV/DPV_Labels_descriptions-deDE.json";
import dpvLabelsDescriptionsIT from "~/static/data/DPV/DPV_Labels_descriptions-itIT.json";
import dpvLabelsDescriptionsFR from "~/static/data/DPV/DPV_Labels_descriptions-frFR.json";

const initialMax = 5;

export default {
  props: {
    controller: {
      type: Object,
    },
  },
  data() {
    return {
      searchValue: "",
      max: initialMax,
      groupBy:null
    };
  },

  created() {
    this.groupBy = this.groupByOptions[0];
  },

  async asyncData({ params, query }) {
    let controller = params.controller;
    console.log(controller)
    let policyIDs = query.policyIDs;

    let policy = await PolicyService.default.get(controller, policyIDs);

    let dpv = await policy.fetch_DPV_Labels_and_descriptions()

    let mapGroupedByData = policy.getOtherLegalBasesMap(
      "hasPersonalDataCategory",
      "hasPurpose"
    );

    let mapGroupedByPurpose = policy.getOtherLegalBasesMap(
      "hasPurpose",
      "hasPersonalDataCategory"
    );
    
    let legalBases = Object.keys(mapGroupedByData);


    return {
      dpv,
      mapGroupedByData,
      mapGroupedByPurpose,
      legalBases

    }
  },


  computed: {
    groupByOptions() {
      return [
        this.$t("nav.labels.data"),
        this.$t("nav.labels.purposes")
      ];
    },

    placeholderKey() {
      if (this.groupByOptions.indexOf(this.groupBy) === 0) {
        return "data";
      } else {
        return "purpose";
      }      
    },

    map() {
      if (this.groupByOptions.indexOf(this.groupBy) === 0) {
        return this.mapGroupedByData;
      } else {
        return this.mapGroupedByPurpose;
      }
    },

    parents() {
      let result = {};
      Object
        .keys(this.map)
        .forEach((legalBasis) => {
          result[legalBasis] = Object
            .keys(this.map[legalBasis])
            .filter((e) => {
              let label = this.dpv[this.$i18n.locale].labels[e].toLowerCase();
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
      this.max = initialMax;
      this.$forceUpdate();
    },

    labelFromIRI(IRI){
      return IRI.split(":")[1]
    }
  },
};
</script>
