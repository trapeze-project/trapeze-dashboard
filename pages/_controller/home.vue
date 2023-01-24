<template>
  <div id="index">
    <v-row justify="center" align="center">
      <v-col>
        <PWlcmMsg 
          :controller="controller"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, idx) in Object.values($t('home.items'))"
        :key="idx"
        cols="6"
        sm="3"
        md="3"
        lg="3"
      >
        <PExplainCard
          class="fill-height"
          :controller="controller"
          :title="item.title"
          :content="item.content"
          :filename="item.filename"
          :href="item.link"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ControllerService from "../../modules/ControllerService.js";

export default {
  data() {
    return {
      controller: this.$store.state.controllerInfo 
    }
  },
  mounted() {

  }
}
</script>
