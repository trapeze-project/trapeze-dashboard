<template>
  <div>
    <!--
    <p class="font-weight-black ml-4">
      {{ $t("consent.sensitivity") }}
      <v-tooltip right max-width="25%">
        <template v-slot:activator="{ on, attrs }">
          <v-icon small v-bind="attrs" v-on="on">
            mdi-information-outline
          </v-icon>
        </template>
        <v-card>
          <v-card-title>
            {{ $t("consent.sensitivityHeader") }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ $t("consent.sensitivityText") }}
          </v-card-text>
        </v-card>
      </v-tooltip>
    </p>
    -->
    <v-slider
      class="px-3"
      color="black"
      track-color="grey"
      min="0"
      max="10"
      step="1"
      :ticks="true"
      tick-size="0"
      :tick-labels="labels"
      v-model="sensitivityCurrent"
      @change="show"
    />
    <div>{{ this.sensitivityCurrent}}</div>
    <v-btn @click="show">show value</v-btn>
  </div>
</template>

<script>
export default {
  
  props: {
    sensitivityValue: {
      type: Number,
      required: true,
      default: 10

    },
    dataCategoryName:{
      type: String,
      required: true,
    }
  },
  data(){
    return {
      sensitivityCurrent:0
    }
  },
  created(){
    this.sensitivityCurrent = this.sensitivityValue
  },
  computed: {
    labels() {
      let labels = new Array(11).fill('');
      labels[0] = this.$t("sensitivity.low");
      labels[10] = this.$t("sensitivity.high");
      return labels;
    }
  },
  methods:{
    show(){
      console.log("changed sensitivityValue")
      this.$emit(
        "changeSensitivityValue",
        this.dataCategoryName,
        this.sensitivityCurrent
      );
    }
  }
}
</script>
