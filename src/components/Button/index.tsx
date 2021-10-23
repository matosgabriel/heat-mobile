import React from 'react';
import { TouchableOpacity, Text, ColorValue, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  textColor: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({
    title,
    textColor,
    backgroundColor,
    icon,
    isLoading = false,
    ...rest
  }: IButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      {...rest}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      { isLoading ? <ActivityIndicator size='large' color={textColor} /> : (
        <>
          <AntDesign name={icon} size={24} style={{ marginRight: 12 }} />
          
          <Text style={[styles.title, { color: textColor }]}>
            {title}
          </Text>
        </>
      ) }
    </TouchableOpacity>
  );
}