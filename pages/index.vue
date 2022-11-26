<template>
  <div>
    <v-btn @click="loadOrgDashboard('CloverIT')">
      CloverIT
    </v-btn>
    <v-btn @click="loadOrgDashboard('AlexIT')">
      AlexIT
    </v-btn>
  </div>
</template>

<script>
import AlexITController from '~/static/data/AlexITController.json'
import CloverITController from '~/static/data/CloverITController.json'


export default {
  layout: 'empty',
  methods:{
    loadOrgDashboard(organizationName){
      if(organizationName === 'CloverIT'){
        this.$GlobalVariables.dataController = CloverITController
        this.$router.push({ path:this.localePath(`/${organizationName}`) } )
      }else if(organizationName === 'AlexIT'){
        this.$GlobalVariables.dataController = AlexITController
        this.$router.push({ path:this.localePath(`/${organizationName}`)})
      }

    }
  },
}
</script>
