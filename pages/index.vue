<template>
  <v-container>
    <v-row>
      <v-col align="center">

        <v-row class="mt-5">
          <v-col 
            cols="8"
            offset="2"
            md="4"
            offset-md="4"
          >
            <h1 style="text-transform:uppercase">{{ $t("landing.general.welcome") }}</h1>

            <v-img src="/img/trapeze-logo.png" class="my-5 "/>

            <h2 style="text-transform:uppercase">{{ $t("landing.general.pd") }}</h2>
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
                {{ $t("landing.login.heading") }}
              </v-card-title>

              <v-card-text>
                {{ $t("landing.login.content") }}
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn color="primary" class="rounded-pill px-5 black--text" disabled>
                  {{ $t("landing.login.btn") }}
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
                {{ $t("landing.choose-controller.heading") }}
              </v-card-title>

              <v-card-text>
                {{ $t("landing.choose-controller.content") }}
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn 
                  color="primary"
                  class="rounded-pill px-5 black--text" 
                  :to="`/${$i18n.locale}/controller-selection`"
                >
                  {{ $t("landing.choose-controller.btn") }}
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
                {{ $t("landing.consent.heading") }}
              </v-card-title>

              <v-card-text>
                {{ $t("landing.consent.content") }}
              </v-card-text>

              <v-spacer />

              <v-card-actions class="d-flex justify-center pb-3">
                <v-btn color="primary" class="rounded-pill px-5 black--text" disabled>
                  {{ $t("landing.consent.btn") }}
                </v-btn>
              </v-card-actions>              
            </v-card>
          </v-col>
        </v-row>        

      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="10" 
        offset="1"
        md="6"
        offset-md="3" 
        align="center" 
        class="mt-3 mb-5"
      >
        <v-img src="/img/eu-logo.png" width="48" class="mb-5" />
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