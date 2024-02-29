<template>
  <div class="mb-8">
    <div class="videoContainer" id="videoContainer">
        <video class="d-block w-100 mt-4 bg-black" id="videoPlayer" preload="auto" autoplay="true"> </video>
        <div v-show="isSessionStarted" id="videoController" class="video-controller unselectable">
            <div id="playPauseBtn" class="btn-play-pause" title="Play/Pause">
                <span id="iconPlayPause" class="icon-play"></span>
            </div>
            <span id="videoTime" class="time-display">00:00:00</span>
            <div id="fullscreenBtn" class="btn-fullscreen control-icon-layout" title="Fullscreen">
                <span class="icon-fullscreen-enter"></span>
            </div>
            <div id="bitrateListBtn" class="control-icon-layout" title="Bitrate List">
                <span class="icon-bitrate"></span>
            </div>
            <input type="range" id="volumebar" class="volumebar" value="1" min="0" max="1" step=".01">
            <div id="muteBtn" class="btn-mute control-icon-layout" title="Mute">
                <span id="iconMute" class="icon-mute-off"></span>
            </div>
            <div id="trackSwitchBtn" class="control-icon-layout" title="A/V Tracks">
                <span class="icon-tracks"></span>
            </div>
            <div id="captionBtn" class="btn-caption control-icon-layout" title="Closed Caption">
                <span class="icon-caption"></span>
            </div>
            <span id="videoDuration" class="duration-display">00:00:00</span>
            <div class="seekContainer">
                <div id="seekbar" class="seekbar seekbar-complete">
                    <div id="seekbar-buffer" class="seekbar seekbar-buffer"></div>
                    <div id="seekbar-play" class="seekbar seekbar-play"></div>
                </div>
            </div>
        </div>
    </div>
  </div>

  <v-btn v-if="!isSessionStarted" @click="startSession()" color="success" variant="outlined" class="mr-4">Start Session</v-btn>
  <v-btn @click="endSession()" color="error" variant="outlined">End Session</v-btn>
</template>

<script lang="ts">
import dashjs from 'dashjs';

export default {
  props: {
    sessionID: {
      type: String,
    },
    video: {
      type: Object,
    },
  },

  emits: ['endSession'],

  data() {
    return {
      player: dashjs.MediaPlayer().create(),
      isSessionStarted: false,
      //@ts-ignore
      controlBar: new ControlBar(this.player)
    };
  },

  watch: {
    video() {
      if (this.player.isReady()) {
        this.player.reset();      
      }
      this.isSessionStarted = false;
    },
  },

  methods: {
    sendCMCDData(event: any) {
      event.cmcdData["type"] = event.mediaType; // add media type to CMCD data
      const url = import.meta.env.VITE_MEASUREMENT_SERVER + "/api/measurements/cmcd/";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event.cmcdData),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    startSession() {
      this.isSessionStarted = true;
      this.initPlayer();
    },

    initPlayer() {
    if (this.video) {

      // Initialize the player
      this.player.initialize();

      // Get the video element
      var videoElement = document.querySelector('#videoPlayer') as HTMLMediaElement;

      // Add event listener for CMCD data
      //@ts-ignore
      this.player.on(dashjs.MetricsReporting.events.CMCD_DATA_GENERATED, this.sendCMCDData);

      // Update player settings to enable CMCD
      this.player.updateSettings({
        streaming: {
          cmcd: {
            enabled: true,
            sid: this.sessionID,
            cid: this.video.id,
            mode: "query",
            enabledKeys: [
              "br", "d", "ot", "tb", "bl", "dl", "mtp", "nor", "nrr",
              "su", "bs", "rtp", "cid", "pr", "sf", "sid", "st", "v",
            ],
          },
        },
      });

      // Load the video
      this.player.setAutoPlay(true);
      this.player.attachView(videoElement);
      this.player.attachSource(this.video.url);

      // Add custom control bar
      //@ts-ignore
      var controlbar = new ControlBar(this.player);
      controlbar.initialize();
    }
  },

  endSession() {
      this.isSessionStarted = false
      this.$emit('endSession');
      this.player.reset();
      const url = import.meta.env.VITE_MEASUREMENT_SERVER + "/api/measurements/session/terminate?id=" + this.sessionID;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "www-form-urlencoded",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>