<template>
  <div class="bg">
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
              v-for="card, index in cards"
              :key="index"
              cols="12"
              md="4"
              class="pa-4"
              align="left"
            >
              <v-card rounded="xl" elevation="3" class="d-flex flex-column fill-height">
                <v-card-title>
                  <!-- <v-icon color="black" size="48" class="mr-3">mdi-account-circle-outline</v-icon> -->
                  {{ $t(card.heading) }}
                  <v-img :src="card.img" class="mt-5 mx-auto" max-width="85%" />
                </v-card-title>
                
                <v-spacer />

                <v-card-text>
                  {{ $t(card.content) }}
                </v-card-text>

                <v-card-actions class="d-flex justify-center pb-3">
                  
                  <v-btn
                    v-if="card.to"
                    color="primary"
                    class="rounded-pill px-5 black--text"
                    :to="card.to"
                  >
                    {{ $t(card.btn) }}
                  </v-btn>

                  <v-btn
                    v-else 
                    color="primary"
                    class="rounded-pill px-5 black--text"
                    disabled
                  >
                    {{ $t(card.btn) }}
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
          <small>
            The TRAPEZE project receives funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No. 883464. <br />
            Copyright © 2023
          </small>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "appBarOnly",
  data() {
    return {
      cards: []
    }
  },
  async mounted() {
    await this.$auth.loginWith("keycloak"); // NOTE: command to trigger redirect to keycloack server
    console.log(this.$auth.loggedIn) // NOTE: command to check if user is logged in or not

    this.cards = [{
        heading: "landing.login.heading",
        content: "landing.login.content",
        btn: "landing.login.btn",
        to: null,
        img: "/img/landing-login-icon.svg"
      }, {
        heading: "landing.choose-controller.heading",
        content: "landing.choose-controller.content",
        btn: "landing.choose-controller.btn",
        to: `/${this.$i18n.locale}/controller-selection`,
        img: "/img/landing-select-icon.svg"
      }, {
        heading: "landing.consent.heading",
        content: "landing.consent.content",
        btn: "landing.consent.btn",
        to: null,
        img: "/img/landing-manage-icon.svg"
      }]
  }
}
</script>

<style scoped>
.bg { 
  background-image: url("/img/bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%; 
  box-sizing: border-box;
}
</style>