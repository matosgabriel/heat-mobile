import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import { UserPhoto } from '../UserPhoto';

import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

function Header() {
  const { signOut, user } = useAuth();
  
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        { !!user && <TouchableOpacity style={{ padding: 5 }} onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity> }

        <UserPhoto imageUri={user?.avatar_url} size='NORMAL' />
      </View>
    </View>
  );
}

export { Header }