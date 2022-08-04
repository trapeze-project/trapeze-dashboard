<template>
  <div class="">
    <v-menu
      open-on-hover
      offset-x
      :close-on-content-click="false"
      nudge-right="18"
    >
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          style="color:blue; text-decoration:underline"
          class="phovercardtxt"
        >
          {{term}}
        </span>
      </template>
      
      <v-card
        class="mx-auto"
        max-width="400"
        outlined
      >
        <v-img :src="image" height="150"></v-img>
        <v-card-text >
          <p>
            {{this.definition}}
          </p>

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
.phovercardtxt {
    cursor: help;
}
</style>
