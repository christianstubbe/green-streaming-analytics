<template>
  <h1>Playlist</h1>
  <v-list>
    <v-list-item
      @click="selectVideo(video)"
      v-for="video in playlist.videos"
      :key="video.id"
      :title="video.title"
    >
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import playlist from "../assets/playlist.json";

export default {
  data() {
    return {
      playlist: playlist,
    };
  },

  props: {
    video: {
      type: Object,
    }
  },

  emits: ["video-selected"],

  methods: {
    selectVideo(video: any) {
      this.$emit("video-selected", video);
    },
  },
};
</script>
