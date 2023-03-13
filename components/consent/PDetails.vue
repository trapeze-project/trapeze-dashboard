<template>
  <div>
    <v-card class="mb-2" outlined elevated="0">
      <v-container>
        <v-row>
          <v-col :cols="12" class="pa-0">
            <v-card-title 
              class="pa-0 pl-5 clickable"
              @click="showDetails = !showDetails; max = 10"
            >
              <v-switch
                inset
                v-model="parentSwitchValue"
                @change="changeParentValue"
              />

              <b class="ml-3 me-auto">
                {{ this.$t(`dpv.labels.${this.parent}`) }}
              </b>

              <div class="mr-3">
                <v-icon v-if="showDetails"> mdi-chevron-up </v-icon>
                <v-icon v-else> mdi-chevron-down </v-icon>
              </div>
            </v-card-title>

            <v-expand-transition>
              <div v-show="showDetails" class="pa-3">
                <!-- Data / Purposes -->
                <!-- TODO: search -->

                <v-row>
                  <v-col class="fill-height pb-0">
                    <v-text-field 
                      v-model="searchValue"
                      :placeholder="'Search for ...'" 
                      outlined
                      dense 
                      clearable 
                      append-icon="mdi-magnify"
                      @keyup.enter="max = 10"
                      @click:append="max = 10"
                      @click:clear="searchValue = ''; max = 10"
                    />
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
                
                <div v-if="max < children.length" class="d-flex justify-center mt-3">
                  <v-btn
                    class="my-2 black--text" 
                    color="primary" 
                    @click="() => max += max"
                  >
                    Load more
                  </v-btn>
                </div>

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
      required: true,
    },
  },
  data() {
    return {
      parentSwitchValue: false,
      ChildrenSwitchesValues: {},
      showDetails: false,
      userChoices: {},
      searchValue: "",
      max: 10,
    };
  },
  computed: {
    slicedChildren() {
      return this
        .children
        .filter((e) => {
          let label = this.$t(`dpv.labels.${e}`).toLowerCase();
          return label.includes((this.searchValue) ? this.searchValue : '');
        });        
    }
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
