<template>
  <div>
    <v-card class="mb-2">
      <v-container>
        <v-row>
          <v-col :cols="10" class="py-0">
            <v-card-title class="pb-0 pl-0">
              <div class="d-inline-flex align-center ml-4">
                <v-switch inset v-model="parentSwitchValue" @change="changeParentValue"></v-switch>
                <div>
                  <b class="mb-1">{{ this.parent }}</b>
                  <p style="display: inline">
                    (used for {{ this.children.length }} {{this.tabName === 'data'?'purpose':'data'}})
                  </p>
                </div>
              </div>
            </v-card-title>
            <v-expand-transition>
              <div v-show="showDetails">
                <v-card class="mb-5" outlined elevation="0">
                  <v-container>
                    <v-card
                      class="mb-1"
                      v-for="child in children"
                      :key="child"
                      outlined
                      elevation="0"
                    >
                      <v-card-title>
                        <v-switch inset v-model="ChildrenSwitchesValues[child]" @change="changeUserChoice(child)"></v-switch>
                        <b class="mb-1">{{ child }} </b>
                      </v-card-title>
                      <v-card-text> desc1 </v-card-text>
                    </v-card>
                  </v-container>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title> Recipients other than cloverIT: </v-card-title>
                </v-card>
                <v-card class="mb-4">
                  <v-card-title> Storage Duration </v-card-title>
                </v-card>
                <v-card class="mb-4">
                  <v-card-title> Sensitivity </v-card-title>
                </v-card>
              </div>
            </v-expand-transition>
          </v-col>
          <v-col
            :cols="2"
            align="center"
            style="background: #687484; border-radius: 4px"
            class="clickable"
            @click="showDetails = !showDetails"
          >
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <v-col>
                  <span>{{
                    this.showDetails ? "(hide details)" : "(see details)"
                  }}</span>
                </v-col>
              </v-row>
            </v-container>
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
			parentSwitchValue:false,
			ChildrenSwitchesValues:{},
      showDetails: false,
      userChoices: {},
      purposeMap: {
        "dpv.advertising": ["dpv.location", "dpv.name"],
        "dpv.marketing": ["dpv.location", "dpv.name"],
      },
    };
  },
	created(){
		this.ChildrenSwitchesValues = Object.assign({}, this.subTree);
		this.parentSwitchValue = Object.values(this.ChildrenSwitchesValues).includes(true) ? true : false
	},
	methods:{
		changeUserChoice (child) {
			if(Object.values(this.ChildrenSwitchesValues).every((currentValue)=> currentValue===false)){
				this.parentSwitchValue= false
			}else{
				this.parentSwitchValue= true
			}
      this.$emit('changeUserChoice', this.parent, child, this.ChildrenSwitchesValues[child])
    },
		changeParentValue(){
			for(const child in this.ChildrenSwitchesValues){
				this.ChildrenSwitchesValues[child]= this.parentSwitchValue
				this.changeUserChoice(child)
			}
		}
	}
};
</script>
