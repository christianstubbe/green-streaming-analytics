<template>

  <LoadingAnimation />

  <TheHeader />

  <v-container>
    <v-row>
      <v-col>
        <SetupForm v-if="!isSessionCreated"
          :sessionID="sessionID"
          :isSessionCreated="isSessionCreated"
          @create-session="createSession"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <SessionInfo 
          :sessionID="sessionID" 
          :isSessionCreated="isSessionCreated" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <ThePlayer
          @end-session="endSession"
          :sessionID="sessionID"
          :video="video"
        />
      </v-col>
      <v-col>
        <ThePlaylist @video-selected="videoSelected" :video="video" />
      </v-col>
    </v-row>
  </v-container>

  <TheFooter />
</template>

<script lang="ts">
import { uuid } from "vue-uuid";
import { useCookies } from "vue3-cookies";
import TheHeader from "../components/TheHeader.vue";
import ThePlayer from "../components/ThePlayer.vue";
import TheControls from "../components/TheControls.vue";
import ThePlaylist from "../components/ThePlaylist.vue";
import TheFooter from "../components/TheFooter.vue";
import SetupForm from "../components/SetupForm.vue";
import SessionInfo from "../components/SessionInfo.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  components: {
    TheHeader: TheHeader,
    ThePlayer: ThePlayer,
    TheControls: TheControls,
    ThePlaylist: ThePlaylist,
    TheFooter: TheFooter,
    SetupForm: SetupForm,
    SessionInfo: SessionInfo,
    LoadingAnimation: LoadingAnimation,
  },

  data() {
    return {
      sessionID: uuid.v4(),
      isSessionCreated: false,
      isSessionStarted: false,
      video: {
          title: "gray_4k_25fps_05mbps_h264",
          id: "gray_4k_25fps_05mbps_h264",
          url: "https://storage.googleapis.com/gray_4k_25fps_05mbps_h264/dash.mpd"
      },
    };
  },

  methods: {
    videoSelected(video: any) {
      this.video = video;
    },
    createSession() {
      const { cookies } = useCookies();
      cookies.set('sessionID', this.sessionID);
      this.isSessionCreated = true;
    },
    endSession() {
      const { cookies } = useCookies();
      cookies.remove('sessionID', this.sessionID);
      this.isSessionCreated = false;
      this.isSessionStarted = false;
    },
  },

  mounted() {
    const { cookies } = useCookies();
    if (cookies.get('sessionID')) {
      this.sessionID = cookies.get('sessionID')
      this.isSessionCreated = true;
    }
  },
};
</script>
