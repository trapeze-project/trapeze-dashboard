<template>
  <div class="">
    <v-menu
      open-on-hover
      offset-x
      :close-on-content-click="false"
      nudge-right="18"
    >
      <template v-slot:activator="{ on, attrs }">
        {{term}}
        <v-icon
          small
          v-bind="attrs"
          v-on="on"
          color="green darken-2"
          class="phovercardinfoicon"
        >
          mdi-information-outline
        </v-icon>
      </template>
      
      <v-card
        max-width="400"
        outlined
      >
        <v-img v-if="image" :src="image" height="400"></v-img>
        <v-card-text>
          <span style="white-space:pre-line">{{this.definition}}</span>
        </v-card-text>

      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    term: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    definition: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    image: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.phovercardinfoicon {
   cursor: pointer;
}
</style>
