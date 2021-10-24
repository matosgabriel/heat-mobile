import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { io } from 'socket.io-client';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { IMessage, Message } from '../../components/Message';
import { COLORS } from '../../theme';

import { api } from '../../services/api';

import { styles } from './styles';

// Socket connection with backend
const socket = io(String(api.defaults.baseURL));

// Queue of new messages receveid from socket
let messagesQueue: IMessage[] = [];

socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

function Home() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [messageText, setMessageText] = useState('');

  const { signIn, user, loadingSignIn } = useAuth();

  async function handleMessageSubmit() {
    setLoadingSendMessage(true);
    
    if (messageText.trim().length > 0) {
      await api.post('/messages', { text: messageText });
      Alert.alert('Boa!', 'Sua mensagem foi enviada! 🤗');
    } else {
      Alert.alert('Erro!', 'A mensagem não pode ser vazia! 😆');
    }
    
    Keyboard.dismiss();
    setMessageText('');
    setLoadingSendMessage(false);
  }

  useEffect(() => {
    api.get<IMessage[]>('/messages/last3').then(response => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => {
          return [messagesQueue[0], prevState[0], prevState[1]];
        })

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    >
      <View style={styles.container}>
        <Header />

        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps='never'
          showsVerticalScrollIndicator={false}
        >
          {messages.map(message => {
            return (
              <Message
                text={message.text}
                user={{ avatar_url: message.user.avatar_url, name: message.user.name }}
                key={message.id}
              />
            );
          })}

        </ScrollView>
          
        {
          !!user ? (
            <View style={styles.sendMessageForm}>
              <TextInput
                style={styles.sendMessageInput}
                keyboardAppearance='dark' 
                placeholder='Qual a sua expectativa para o evento?'
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                maxLength={140}
                value={messageText}
                onChangeText={setMessageText}
                editable={!loadingSendMessage}
              />

              <Button
                title='ENVIAR MENSAGEM'
                backgroundColor={COLORS.PINK}
                textColor={COLORS.WHITE}
                isLoading={loadingSendMessage}
                onPress={() => handleMessageSubmit()}
              />
            </View>
          ) : (
            <View style={styles.signInBox}>
              <Button
                backgroundColor={COLORS.YELLOW}
                textColor={COLORS.BLACK_PRIMARY}
                title='ENTRAR COM GITHUB'
                icon='github'
                isLoading={loadingSignIn}
                onPress={signIn}
              />
            </View>
          )
        }
      </View>
    </KeyboardAvoidingView>
  );
}

export { Home }