<template>
  <v-dialog
    v-model="isDialogOpen"
    width="1024"
    persistent
    transition="center center"
  >
    <template v-slot:activator="{ props }">
      
    </template>

    <v-card title="Smart plug configuration">
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  required
                  label="NETIO IP address*"
                  v-model="IPaddress"
                  placeholder=""
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  required
                  label="NETIO serial number*"
                  v-model="serialNumber"
                  placeholder=""
                ></v-text-field>
              </v-col>
            </v-row>
            <small>* required field</small>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          variant="outlined"
          text="Create session"
          @click="createSession()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

export default {
  data() {
    return {
      isDialogOpen: true,
      IPaddress: "",
      serialNumber: "",
    };
  },

  props: {
    sessionID: {
      type: String,
    },
    isSessionCreated: {
      type: Boolean,
    },
  },

  emits: [ 'createSession'],

  methods: {
    createSession() {
      this.isDialogOpen = false;  
      this.$emit('createSession');
      this.sendSessionConfig();
    },

    sendSessionConfig() {
      const url = import.meta.env.VITE_MEASUREMENT_SERVER + "/api/measurements/session/";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IPaddress: this.IPaddress,
          serialNumber: this.serialNumber,
          sessionID: this.sessionID,
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        }); 
    }
  },
};
</script>
