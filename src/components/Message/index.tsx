import React from 'react';
import { View, Text } from 'react-native';
import { UserPhoto } from '../UserPhoto';
import { MotiView } from 'moti';

import { styles } from './styles';

interface IMessage {
  id?: string;
  text: string;

  user: {
    name: string;
    avatar_url: string;
  }
}

function Message({ text, user }: IMessage) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        { text }
      </Text>
    
      <View style={styles.user}>
        <UserPhoto size='SMALL' imageUri={user.avatar_url} /> 
        <Text style={styles.userName}>{user.name}</Text>
      </View>
    </MotiView>
  );
}

export { Message, IMessage }