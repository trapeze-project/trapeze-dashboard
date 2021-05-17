<template>
  <div>
    <div style="text-align:center">
      <small v-if="(calculateScore/value.reduce((x,y) => x + y.consentRank,0))*100<25">
        <i>low</i>
      </small>
      <small v-else-if="(calculateScore/value.reduce((x,y) => x + y.consentRank,0))*100<60">
        <i>medium</i>
      </small>
      <small v-else>
        <i>high</i>
      </small>
    </div>
    <div style="width:100%;display:flex;flex-flow:row nowwrap;align-items:center;justify-content:center;">
      <v-progress-linear
        style="width:70vw;"
        :value="(calculateScore/value.reduce((x,y) => x + y.consentRank,0))*100"
        rounded
      />
    </div>

    <v-row>
      <v-col lg="6" xl="6" md="6" sm="12" cols="12">
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
      <v-col lg="6" xl="6" md="6" sm="12" cols="12">
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
