<template>
  <div>
    <nuxt-child />
    <!-- <h1>Org</h1> -->
    <!-- <div>
        {{this.$store.state.controllerInfo}}
    </div>
    <div>
        {{this.$store.state.controllerPrivacyPolicy}}
    </div> -->
  </div>
</template>

<script>
import ControllerService from "../modules/ControllerService.js";
import TrapezePolicies from "../static/data/TRAPEZE_policies.json"
export default {

  middleware({ params, store, redirect, app, context }) {
    //this.$store.state.controllerPrivacyPolicy.info
    let controllerID = params.controller
    store.commit('setControllerInfo',ControllerService.get(controllerID))
    store.commit('setControllerPrivacyPolicy',TrapezePolicies)
  },


};
</script>
