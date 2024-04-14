import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, Text, Keyboard } from 'react-native';
import MoreOptions from './MoreOptions';
import InputArea from './InputArea';
import MessageArea from './MessageArea';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import Arrow from '../assets/arrow_back.svg';
import Voice from '../assets/Voice.svg';
import * as Location from 'expo-location';
import LoadingWindow from './LoadingWindow';
import MessageBubble from './MessageBubble';


export default function GuideScreen({ image }) {

  const [isLoading, setIsLoading] = useState(true);
  const [tourStarted, setTourStarted] = useState(false);
  const [description, setDescription] = useState('Welcome to the tour!');
  const [blur, setBlur] = useState(0);
  const [messages, setMessages] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    console.log("MESSAGES: ", messages)
  }, [messages]);

  const handleSubmit = async (query) => {
    try {
      const response = await fetch('http://35.2.64.165:50015001/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: query }]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTourStarted() {
    setTourStarted(true);

    const location = await Location.getCurrentPositionAsync({});

    const formData = new FormData();
    formData.append('ImageData', {
      uri: image,
      type: 'ImageData/jpeg',
      name: 'ImageData.jpg'
    });
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);

    const result = await fetch('http://35.2.64.165:5001/analyzeImage', {
      method: 'POST',
      body: formData,
    })

    const data = await result.text();

    setMessages([...messages, { bot: true, text: data }]);
    setTourStarted(false);
    setIsLoading(false);
    setBlur(5);
  }

  function addUserMessage(prev, message) {
    const curr = [...prev, { bot: false, text: message }]
    setMessages(curr);
    return curr;
  }

  function addBotMessage(prev, message) {
    const curr = [...prev, { bot: true, text: message }];
    setMessages(curr);
    return curr;
  }

  function handleProcessing(boolean) {
    setProcessing(boolean);
  }

  const [absolute, setAbsolute] = useState({position: 'relative'});

  function handleInputFocus(abs) {
    if (abs) {
      setAbsolute({position: 'relative'});
    } else {
      setAbsolute({position: 'absolute'});
    }
  }

  return (
    <View style={styles.container}>
      <LoadingScreen image={image} rad={blur}/>
      {isLoading && !tourStarted &&
        <>
          <Stack.Screen options={{
            header: props => <View style={styles.header}>
            <Pressable onPress={() => props.navigation.goBack()}><Arrow /></Pressable>
            <View style={styles.center}>
              {/* <Image style={styles.icon} source={require('../assets/3d6d5480d01baa8625417cb053ab3d43.png')} /> */}
              <Text style={styles.headerText}>Photo</Text>
            </View>
            <Voice style={styles.icon} opacity={0}/>
          </View>
          }}/>
          <Pressable style={styles.flexCol} onPress={handleTourStarted}>
            <LinearGradient style={styles.startTour} colors={['#2B70DE', '#9168C0']}>
              <Image source={require('../assets/gemini.png')} style={styles.gemini} />
              <Text style={styles.startText}>Start Tour</Text>
            </LinearGradient>
          </Pressable>
        </>
      }
      {tourStarted && isLoading && <>
        <Stack.Screen options={{
          header: props => <View style={styles.header}>
          <Pressable onPress={() => props.navigation.goBack()}><Arrow /></Pressable>
          <View style={styles.center}>
            {/* <Image style={styles.icon} source={require('../assets/3d6d5480d01baa8625417cb053ab3d43.png')} /> */}
            <Text style={styles.headerText}>Scanning...</Text>
          </View>
          <Voice style={styles.icon} opacity={0}/>
        </View>
        }}/>
        <LoadingWindow />
      </>}
      {isLoading ||
        // <Pressable style={{}} onPress={Keyboard.dismiss}>
        <>
          <Stack.Screen options={{
            header: props => <View style={styles.header}>
            <Pressable onPress={() => props.navigation.goBack()}><Arrow /></Pressable>
            <View style={styles.center}>
              <Image style={styles.icon} source={require('../assets/3d6d5480d01baa8625417cb053ab3d43.png')} />
              <Text style={styles.headerText}>Virtual Tour Guide</Text>
            </View>
            <Voice style={styles.icon} />
          </View>
          }}/>
          {/* <Image source={image} style={styles.image} /> */}
          <View style={styles.overlay} />
          <ScrollView style={[styles.scroll, absolute]}>
            <MessageArea messages={messages} processing={processing}/>
          </ScrollView>
          <View style={styles.footer}>
              <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding" keyboardVerticalOffset={80} >
                <MoreOptions
                  addUserMessage={addUserMessage}
                  addBotMessage={addBotMessage}
                  messages={messages}
                  processing={processing}
                  setProcessing={handleProcessing}
                />
                <InputArea
                  focus={() => handleInputFocus(false)}
                  blur={() => handleInputFocus(true)}
                  addUserMessage={addUserMessage}
                  addBotMessage={addBotMessage}
                  messages={messages}
                  processing={processing}
                  setProcessing={handleProcessing}
                />
              </KeyboardAvoidingView>
          </View>
        </>
        // </Pressable>
     }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignContent: 'center',
    flex: 1,
  },
  keyboardContainer: {
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    // bottom: 0
    // flex: 1
    backgroundColor: 'rgba(1, 1, 1, 0.6)',
    paddingTop: 5
  },
  image: {
    width: 400,
    height: 750,
    position: 'absolute',
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'black',
    opacity: 0.7,
    width: 400,
    height: 750,
  },
  scroll: {
    position: 'absolute',
    // width: 400,
    height: 750,
    // marginBottom: -250,
    paddingBottom: 650,
    flex: 1,
  },
  footer: {
    alignSelf: 'center',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  startTour: {
    alignSelf: 'center',
    backgroundColor: '#214485',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 70,
  },
  startText: {
    color: 'white',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  gemini: {
    width: 20.93,
    height: 24,
  },
  header: {
    backgroundColor: '#00042C',
    height: 101,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55
  },
  icon: {
    width: 16,
    height: 16,
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
  }
});

/*
import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MoreOptions from './MoreOptions';
import InputArea from './InputArea';
import MessageArea from './MessageArea';

export default function GuideScreen({ image, description }) {

  const renderImage = () => {
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('https') || image.startsWith('file://'))) {
      return { uri: image };
    }
    return image;
  };

  return (
    <View style={styles.container}>
      <Image source={renderImage()} style={styles.image} />
      <View style={styles.overlay} />
      <ScrollView style={styles.scroll}>
        <MessageArea messages={[description]}/>
      </ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80} >
            <View style={styles.footer}>
              <MoreOptions />
              <InputArea />
            </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 400,
    height: 750,
    position: 'absolute',
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  scroll: {
  },
  footer: {
    position: 'fixed',
    bottom: -10,
    alignSelf: 'center',
  },
});

*/
