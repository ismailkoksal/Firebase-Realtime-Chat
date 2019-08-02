<template>
  <div>
    <v-layout
      column
      class="chat"
      v-chat-scroll="{ always: false, smooth: true }"
    >
      <div :key="message.id" v-for="message in messages" class="mb-2">
        <div
          class="my-3 text-xs-center"
          v-if="
            messages.indexOf(message) === 0
              ? message.timestamp
              : message.timestamp !==
                messages[messages.indexOf(message) - 1].timestamp
          "
        >
          <div class="date">
            <span>{{ message.timestamp }}</span>
          </div>
        </div>
        <h5 class="username" v-if="message.username !== username">
          {{ message.username }}
        </h5>
        <div class="message" :class="{ own: message.username === username }">
          <span>{{ message.content }}</span>
        </div>
      </div>
    </v-layout>
    <NewMessage :username="username" />
  </div>
</template>

<script>
import moment from "moment";
import NewMessage from "../components/NewMessage";

export default {
  name: "Chat",
  components: { NewMessage },
  props: ["username"],
  data() {
    return {
      messages: []
    };
  },
  created() {
    this.$db
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.messages.push({
              id: change.doc.id,
              username: change.doc.data().username,
              content: change.doc.data().content,
              timestamp: moment(change.doc.data().timestamp).format(
                "dddd D MMMM"
              )
            });
          } else if (change.type === "removed") {
            let removeIndex = this.messages
              .map(item => {
                return item.id;
              })
              .indexOf(change.doc.id);
            this.messages.splice(removeIndex, 1);
          }
        });
      });
  }
};
</script>

<style scoped>
.chat {
  position: absolute;
  height: calc(100% - 64px);
  width: 100%;
  overflow: auto;
  padding: 16px;
}

.message {
  background-color: #f1f0f0;
  margin: 1px 0;
  padding: 7px 12px;
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 85%;
  border-radius: 20px;
  float: left;
}

.username {
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  font-weight: normal;
  padding-left: 12px;
  margin-bottom: 1px;
}

.date {
  background-color: rgba(94, 110, 237, 0.4);
  color: #5e6eed;
  padding: 3px 12px;
  border-radius: 20px;
  display: inline-block;
}

.own {
  background-color: #5e6eed;
  color: white;
  float: right;
}
</style>
