<template>
    <v-alert
        v-if="isSessionCreated"
        class="my-4"
        color="info"
        alert="CMCD Data Collection"
        ><span>Created new session with ID: <strong>{{ sessionID }}</strong></span>
    </v-alert>
</template>

<script lang="ts">
export default {
  props: {
    sessionID: {
      type: String,
      default: "",
    },
    isSessionCreated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
