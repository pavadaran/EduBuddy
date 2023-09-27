import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const CHATGPT_API_URL = "https://api.openai.com/v1/engines/davinci/completions";
const OPENAI_API_KEY = "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";

const BOT_USER = {
  _id: 2,
  name: 'ChatGPT',
  avatar: 'https://your-bot-avatar-url.com', // Replace with a bot avatar URL.
};

const USER = {
  _id: 1,
};

export default function ChatBot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initial message to welcome the user
    const welcomeMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: "Welcome to the EduBuddy!",
      createdAt: new Date(),
      user: BOT_USER,
    };
    setMessages([welcomeMessage]);
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    // Send the user message to ChatGPT API
    try {
      const response = await axios.post(CHATGPT_API_URL, {
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.
          Human: ${newMessages[0].text}
          AI:`,
        max_tokens: 150,
        temperature: 0.7,
        n: 1,
        stop: 'Human:',
      }, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      });

      const { choices } = response.data;
      const { text: generatedText } = choices[0];

      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: generatedText.trim(),
        createdAt: new Date(),
        user: BOT_USER,
      };
      console.log('API Response:', response.data);
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    } catch (error) {
      if (error.response) {
        console.log("API Error Response:", error.response.data);
      }
      console.log("Axios Error:", error.message);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#E5E5EA',
          },
          right: {
            backgroundColor: '#5BC0EB',
          },
        }}
        textStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={USER}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                borderTopColor: '#E0E0E0',
              }}
            />
          )}
          renderComposer={(props) => (
            <Composer
              {...props}
              textInputStyle={{
                color: 'black',
              }}
            />
          )}
          renderSend={(props) => (
            <Send {...props}>
              <View
                style={{
                  backgroundColor: '#5BC0EB',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 25,
                  height: 40,
                  width:40
                }}
              >
                {<Icon
                  name="send"
                  size={20}
                  color="#FFFFFF"
                  onPress={() => {
                    props.onSend({ text: props.text.trim() }, true);
                  }}
                />}
              </View>
            </Send>
          )}
          renderLoading={() => <ActivityIndicator size="large" color="#5BC0EB" />}
          placeholder="Type your message here..."
          renderBubble={renderBubble}
          showUserAvatar
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={() => (
            <Icon name="chevron-down" size={36} color="#5BC0EB" />
          )}
        />
        <View
        style={{
          flex:0.1,
          backgroundColor: '#fff',
          height: '10'
        }}></View>
      </View>
      
  );
}
