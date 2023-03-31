<template>
  <v-app dark>
    <PNavBar />
    <v-main>
      <div class="bg"></div>
      <div class="bg-text">
        <p class='error-code'>{{this.error.statusCode}}</p>
        <p class="error-text">{{this.title}}</p>    
        <NuxtLink :to="localePath('/')">
          <p class="action">{{$t('error.go-to-home')}}</p>
        </NuxtLink>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      title:""
    };
  },
  head() {
    return {
      title: this.title
    };
  },
  created(){
    const pageNotFound = this.$t('error.page-not-found')
    const otherError = this.$t('an-error-occurred')
    this.title =
      this.error.statusCode === 404 ? pageNotFound : otherError;
  }
};
</script>

<style scoped>



.bg {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  filter: blur(6px);
  -webkit-filter: blur(6px);
  /* Center and scale the image nicely */

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-text {
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.error-code {
  font-size: 13em;
  font-weight: bold;
  margin-bottom: 0px;
}
.error-text {
  font-size: 2em;
  font-weight: bold;
}
.action {
  font-size: 2em;
}

</style>
