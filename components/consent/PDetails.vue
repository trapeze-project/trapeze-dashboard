<template>
  <div>
    <v-card class="mb-2" outlined elevated="0">
      <v-container>
        <v-row>
          <v-col :cols="10" class="pa-0">
            <v-card-title class="pa-0 pl-5">
              <v-switch
                inset
                v-model="parentSwitchValue"
                @change="changeParentValue"
              ></v-switch>
              <b class="ml-3">{{ this.$t(`dpv.labels.${this.parent}`) }}</b>
            </v-card-title>

            <v-expand-transition>
              <div v-show="showDetails" class="pa-3">
                <!-- Data / Purposes -->
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    lg="4"
                    xl="3"
                    v-for="child in children"
                    :key="child"
                  >
                  <v-card
                    outlined
                    elevation="0"
                  >
                    <v-card-title>
                      <v-switch
                        inset
                        v-model="ChildrenSwitchesValues[child]"
                        @change="changeUserChoice(child)"
                      />
                      <b>{{ $t(`dpv.labels.${child}`) }}</b>
                    </v-card-title>
                    <v-card-text>
                      {{ $t(`dpv.descriptions.${child}`) }}
                    </v-card-text>
                  </v-card>                  
                  </v-col>
                </v-row>
                

                <!-- Recipients -->
                <v-card class="my-3" outlined elevation="0">
                  <v-card-title> Recipients other than cloverIT: </v-card-title>
                </v-card>

                <!-- Storage -->
                <v-card class="my-3" outlined elevation="0">
                  <v-card-title> Storage Duration </v-card-title>
                </v-card>

                <!-- Sensitivity -->
                <v-card class="my-3" outlined elevation="0">
                  <v-card-title> Sensitivity </v-card-title>
                </v-card>
              </div>
            </v-expand-transition>
          </v-col>

          <v-hover v-slot="{ hover }">
            <v-col
              :cols="2"
              align="center"
              class="clickable pa-0"
              :style="{
                background: hover ? '#F3F3F3' : 'white',
                'border-radius': '4px',
              }"
              @click="showDetails = !showDetails"
            >
              <v-container fill-height fluid>
                <v-row>
                  <v-col>
                    <v-icon v-if="showDetails"> mdi-chevron-up </v-icon>

                    <v-icon v-else> mdi-chevron-down </v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-hover>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return [, "data", "purpose"].includes(value);
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
      required: true,
    },
  },
  data() {
    return {
      parentSwitchValue: false,
      ChildrenSwitchesValues: {},
      showDetails: false,
      userChoices: {},
    };
  },
  created() {
    this.ChildrenSwitchesValues = Object.assign({}, this.subTree);
    this.parentSwitchValue = Object.values(
      this.ChildrenSwitchesValues
    ).includes(true)
      ? true
      : false;
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
