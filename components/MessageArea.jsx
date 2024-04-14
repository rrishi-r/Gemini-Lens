import { View, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";
import UserBubble from "./UserBubble";

export default function MessageArea({messages, processing}) {

  console.log(messages)

  return (
    <View style={styles.container}>
      {messages.map((message, index) => {
        return (message["bot"] ?
        <MessageBubble key={index} description={message["text"]} /> :
        <UserBubble key={index} description={message["text"]} />
      )})}
      {processing && <MessageBubble description="Generating..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 52,
    marginLeft: 20,
    alignItems: 'flex-start',
    paddingBottom: 150,
  },
});
