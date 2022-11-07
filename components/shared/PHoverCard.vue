<template>
  <div class="">
    <v-menu
      open-on-hover
      offset-x
      :close-on-content-click="false"
      nudge-right="18"
    >
      <template v-slot:activator="{ on, attrs }">
        {{ term }}
        <v-icon
          size="14"
          v-bind="attrs"
          color="green darken-2"
          class="phovercardinfoicon ml-1 outlined "
          v-on="on"
        >
          mdi-information-variant
        </v-icon>
      </template>

      <v-card
        max-width="400"
        outlined
      >
        <v-img v-if="image" :src="image" height="400" />
        <v-card-text>
          <span style="white-space:pre-line">{{ this.definition }}</span>
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
.v-icon.outlined {
  border: 1px solid currentColor;
  border-radius:50%;
  height: 18px;
  width: 18px;
}
</style>
