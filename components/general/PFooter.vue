<template>
  <v-row align-center>
    <v-spacer />
    <v-col cols="9" class="d-flex flex-row align-center justify-center text-center">
      <v-img class="mr-2" max-height="20px" max-width="20px" src="/eu_logo.png" />
      <small>
        The TRAPEZE project receives funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No. 883464 Copyright &copy; {{ new Date().getFullYear() }}
      </small>
      <!-- <a :href="localePath('/imprint')">Imprint </a> -->
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
export default {

}

</script>
