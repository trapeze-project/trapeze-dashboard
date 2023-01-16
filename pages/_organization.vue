<template>
  <div>
    <nuxt-child />
    <!-- <h1>Org</h1> -->
  </div>
</template>

<script>
import AlexITController from "~/static/data/AlexITController.json";
import CloverITController from "~/static/data/CloverITController.json";
export default {
  // layout: 'empty',

  middleware({ params, store, redirect, app, context }) {
    let organizationName = params.organization;

    if(organizationName=='CloverIT'){
      store.commit('setDataController',CloverITController)
    }else if(organizationName=='AlexIT'){
      store.commit('setDataController',AlexITController)
    }

    if (
      app.context.route.path.endsWith(organizationName) ||
      app.context.route.path.endsWith(organizationName + "/")
    ) {
      console.log('directing to home')
      return redirect({
        name: "organization-home___en",
        params: { organization: organizationName },
      });
    }
  },
  validate({ params, query, store }) {
    return ["AlexIT", "CloverIT"].includes(params.organization);
  },

};
</script>
