import { TextInput, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function InputArea({ focus, blur, addUserMessage, addBotMessage, messages, processing, setProcessing }) {
  const [text, setText] = useState('');

  const handlePress = async () => {

    console.log("pressed");
    console.log(text, processing);

    if (text && !processing) {
      console.log("asdfadsfd");

      const curr = addUserMessage(messages, text);
      setProcessing(true);


      const formData = new FormData();
      formData.append('question', text);
      console.log(text)

      setText('');  // Clear the input after sending
      Keyboard.dismiss();

      console.log("POSTING...");

      const result = await fetch('http://35.2.64.165:5001/query', {
        method: 'POST',
        body: formData
      })

      const response = await result.text();
      addBotMessage(curr, response);
      console.log("Response");
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        onFocus={focus}
        onBlur={blur}
        value={text}
        onChangeText={setText}
      >
      </TextInput>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.button}>
            <FontAwesome style={styles.sendButton} name="send" size={20} color="#616CCF" />
          </View>
        </TouchableWithoutFeedback>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // To align the TextInput and Button
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',  // Aligns the button and text input
  },
  sendButton: {
  },
  input: {
    flex: 1, // Takes up all space except for the button
    backgroundColor: 'white',
    display: 'flex',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    marginRight: 5,  // Space between the input and the button
    marginLeft: 12,
    marginBottom: 30
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 30
  },
});
