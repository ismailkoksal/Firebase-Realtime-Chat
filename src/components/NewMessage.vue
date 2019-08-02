<template>
  <v-card class="message_box" flat tile>
    <v-card-actions>
      <v-text-field
        @click:append="sendMessage"
        @keydown.enter="sendMessage"
        append-icon="send"
        background-color="#f7f7f9"
        color="#5e6eed"
        flat
        hide-details
        label="Appuyez ici pour parler"
        single-line
        solo
        v-model="newMessage"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewMessage",
  props: ["username"],
  data() {
    return {
      newMessage: null
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.$db
          .collection("messages")
          .add({
            username: this.username,
            content: this.newMessage.trim(),
            timestamp: Date.now()
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        this.newMessage = null;
      }
    }
  }
};
</script>

<style scoped>
.message_box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.2);
  background-color: #f7f7f9;
}
</style>
