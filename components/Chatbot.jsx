import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const sendMessage = async () => {
        if (!inputText) return;
        const userMessage = { type: 'user', text: inputText, option: selectedOption };
        setMessages([...messages, userMessage]);
        await handleOptionPress(selectedOption, inputText, setMessages);
        setInputText('');
    };

    return (
        <View style={styles.container}>
          <Picker
            selectedValue={selectedOption}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}>
            <Picker.Item label="Safety" value="safety" />
            <Picker.Item label="Other Places to See" value="more-places" />
            <Picker.Item label="Nearby Hotels" value="hotels" />
            {/* // Add other options as necessary */}
            <Picker.Item label="More..." value="chat" />
          </Picker>
          <ScrollView style={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <Text key={index} style={styles.message(msg.type)}>
                {msg.text}
              </Text>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your question..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  message: (type) => ({
    alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
    backgroundColor: type === 'user' ? '#dcf8c6' : '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  }),
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatInterface;
