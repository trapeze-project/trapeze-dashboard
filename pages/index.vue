<template>
  <v-container fluid class="bg-surface-variant">
    <v-row>
      <v-col align="center">

        <v-row class="mt-5">
          <v-col 
            cols="8"
            offset="2"
            md="4"
            offset-md="4"
          >
            <h1 style="text-transform:uppercase">Welcome to the</h1>

            <v-img src="/img/trapeze_logo.png" class="my-5 "/>

            <h2 style="text-transform:uppercase">Privacy Dashboard</h2>
          </v-col>
        </v-row>

        <v-row class="mt-5">

          <v-col 
            cols="10"
            md="4"
            offset="1"
            offset-md="0"
            class="pa-8" 
            align="left"
          >
            <v-card rounded="xl" elevation="3" class="d-flex flex-column fill-height">
              <v-card-title>
                <v-icon color="black" size="48" class="mr-3">mdi-account-circle-outline</v-icon>
                Login
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn color="primary" class="rounded-pill px-5 black--text" disabled>
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col 
            cols="10"
            md="4"
            offset="1"
            offset-md="0"
            class="pa-2"
            align="left"
          >
            <v-card
              rounded="xl"
              elevation="5"
              class="d-flex flex-column fill-height"
            >
              <v-card-title>
                <v-icon color="black" size="48" class="mr-3">mdi-domain</v-icon>
                Choose a Controller
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn 
                  color="primary"
                  class="rounded-pill px-5 black--text" 
                  :to="`/${$i18n.locale}/controller-selection`"
                >
                  Controller Selection
                </v-btn>
              </v-card-actions>              
            </v-card>
          </v-col>

          <v-col 
            cols="10"
            md="4"
            offset="1"
            offset-md="0"
            class="pa-8"
            align="left"
          >
            <v-card rounded="xl" elevation="3" class="d-flex flex-column fill-height">
              <v-card-title>
                <v-icon color="black" size="48" class="mr-3">mdi-file-sign</v-icon>
                Manage your Consent
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn color="primary" class="rounded-pill px-5 black--text" disabled>
                  View
                </v-btn>
              </v-card-actions>              
            </v-card>
          </v-col>
        </v-row>        

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" offset="4" align="center" class="mt-5">
        <v-img src="/img/eu_logo.png" width="48" class="mb-5" />
        The TRAPEZE project receives funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No. 883464. Copyright © 2023
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "appBarOnly",
  methods: {
    redirect() {

    }
  }
}
</script>