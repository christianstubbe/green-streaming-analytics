<template>
  <v-btn
    :disabled="collectCMCD"
    @click="startCMCDCollection"
    color="success"
    prepend-icon="mdi-play"
    variant="outlined"
    class="mr-4"
  >
    Start CMCD Collection
  </v-btn>
  <v-btn
    :disabled="!collectCMCD"
    @click="stopCMCDCollection"
    color="error"
    prepend-icon="mdi-stop"
    variant="outlined"
  >
    Stop CMCD Collection
  </v-btn>
</template>

<script lang="ts">
export default {
  props: {
    collectCMCD: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'start-cmcd-collection',
    'stop-cmcd-collection',
  ],

  methods: {
    startCMCDCollection() {
      this.$emit('start-cmcd-collection');
    },
    stopCMCDCollection() {
      this.$emit('stop-cmcd-collection');
    },
  },
};
</script>
