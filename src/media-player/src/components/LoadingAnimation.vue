<template>
  <div
    :class="showLoader ? 'notFaded' : 'faded'"
    class="loader position-fixed w-100 h-100"
  >
    <img 
      class="d-block mx-auto mt-16 pt-16"
      src="../assets/tu-berlin-logo-long-white.svg"
    >
    <img
      class="w-50 d-block mx-auto mt-16 pt-16"
      justify="center"
      align="center"
      src="../assets/loading-illustration.svg"
      alt="Loading..."
    />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showLoader: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showLoader = false;
    }, 800);
  },
};
</script>

<style scoped>
.loader {
  background-color: #171717;
  z-index: 10000;
  transition: all 0.5s ease-in-out;
}

.faded {
  opacity: 0;
  visibility: hidden;
}
</style>
