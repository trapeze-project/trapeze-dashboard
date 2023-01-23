<template>
  <v-row>
    <v-col cols="9"></v-col>
    <v-col cols="3">
      <div style="position: fixed; z-index: 999">
        <v-card
          width="200px"
          style="border-top-left-radius: 0px; border-top-right-radius: 0px"
        >
          <v-expand-transition>
            <div v-show="show">
              <v-container>
                <v-row>
                  <v-btn width="180px" height="auto" class="ma-2 pa-2 black--text" color="primary" @click="submitMyConsent">
                    Submit my Consent Changes to ControllerName
                  </v-btn>
                </v-row>

                <v-row>
                  <v-btn width="180px" height="auto" class="ma-2 pa-2 black--text" color="primary" @click="undoAllChanges">
                    Undo all Changes
                  </v-btn>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
          <v-card-actions class="pa-0 clickable" @click="show = !show">
            <v-spacer></v-spacer>
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
	methods:{
		undoAllChanges(){
			this.$emit('undoAllChanges')
		},
		submitMyConsent(){
			this.$emit('submitMyConsent')
		}
	}
};
</script>

<style></style>
