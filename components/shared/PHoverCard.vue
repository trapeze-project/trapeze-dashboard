<template>
  <div class="">
    <v-menu
      open-on-hover
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >
          {{term}}
        </span>
      </template>
      
      <v-card
        class="mx-auto"
        max-width="344"
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

<style>

</style>
