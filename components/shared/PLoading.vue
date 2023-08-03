<template>
  <div>
    <div class="center">
      <div class="loader"></div>
    </div>
    <div class="center">
      <p style="font-size: 15px; margin-top:15px">{{ $t("consent.loading") }}...</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.center {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 90px;
  font-weight: bold;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
