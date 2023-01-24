<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
import ControllerService from "../modules/ControllerService.js";
import TrapezePolicies from "../static/data/TRAPEZE_policies.json";
export default {
  middleware({ params, store, redirect, app, context }) {
    let controllerID = params.controller;
    store.commit("setControllerInfo", ControllerService.get(controllerID));
    store.commit("setControllerPrivacyPolicy", TrapezePolicies);
    // window.location.href = "/" + controllerID+'/home';
    if (
      app.context.route.path.endsWith(controllerID) ||
      app.context.route.path.endsWith(controllerID + "/")
    ) {
			window.location.href = "/" + controllerID+'/home'
    }
  },
  // validate({ params, query, store }) {
  //   // check if ControllerID is a valid ID
  // 	return true
  // },
};
</script>
