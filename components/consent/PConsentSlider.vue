<template>
  <div>
    <v-slider
      :value="calculateScore"
      :tick-labels="consentLabels"
      :max="21"
      :min="0"
      readonly
      step="1"
    >
      <template v-slot:prepend>
        <v-subheader>min</v-subheader>
      </template>

      <template v-slot:append>
        <v-subheader>max</v-subheader>
      </template>
    </v-slider>

    <v-row>
      <v-col lg="6" xl="6" md="6" sm="12" xs="12">
        <v-card
          elevation="2"
        >
          <v-card-title>
            You share
          </v-card-title>
          <v-card-text>
            <v-timeline
              align-top
              dense
            >
              <v-timeline-item
                v-for="(item, idx) in value.filter(x => x.value)"
                :key="idx"
                color="primary"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ item.description }}</strong>
                  </div>
                  <div>{{ item.share }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="6" xl="6" md="6" sm="12" xs="12">
        <v-card
          elevation="2"
        >
          <v-card-title>
            You get
          </v-card-title>
          <v-card-text>
            <v-timeline
              align-top
              dense
            >
              <v-timeline-item
                v-for="(item, idx) in value.filter(x => x.value)"
                :key="idx"
                color="primary"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ item.description }}</strong>
                  </div>
                  <div>{{ services[ item.description] }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    services: {
      required: true
    }
  },
  computed: {
    calculateScore () {
      return this.value.filter(x => x.value).map(x => x.consentRank).reduce((x, y) => x + y, 0)
    }
  }
}
</script>
