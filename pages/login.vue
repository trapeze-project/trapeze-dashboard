<template>
  <div>
    <h1>login</h1>
    <p>Trying to authenticate user, going wrong.</p>
    <p>this.$auth.loggedIn value is: {{ this.$auth.loggedIn }}</p>
    <p>this.$auth.user value is: {{ this.$auth.user }}</p>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {};
  },

  async created() {
    // if(!this.$auth.loggedIn)
    // this.$auth.loginWith("keycloak");

    console.log(this.$auth.loggedIn);
    console.log(this.$auth.user);
    if (this.$auth.loggedIn) {
      this.$router.push({ path: this.localePath("service-selection") });
    }

    // await this.$auth.logout(/* .... */)
  },
};
</script>

<style scoped></style>
