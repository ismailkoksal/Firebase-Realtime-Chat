<template>
  <v-layout align-center justify-center fill-height>
    <v-card color="#5e6eed" flat>
      <v-card-text>
        <v-text-field
          @keydown.enter="enterChat"
          hide-details
          label="Entrer votre nom"
          single-line
          solo
          v-model="username"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="enterChat">Entrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null
    };
  },
  methods: {
    enterChat() {
      if (this.username) {
        this.$router.push({
          name: "chat",
          params: { username: this.username }
        });
      }
    }
  }
};
</script>

<style scoped></style>
