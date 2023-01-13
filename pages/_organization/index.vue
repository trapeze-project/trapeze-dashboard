<template>
  <div id="index">
    <v-row justify="center" align="center">
      <v-col>
        <PWlcmMsg />
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
export default {
  data(){
    return{
      organizationName : this.$nuxt.$route.path.split('/')[2]
    }
  },
  mounted() {
    this.$auth.loginWith("keycloak");
  }
}
</script>
