import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export const FullScreenLoader = () => {
  return (
    <View>
      <ActivityIndicator size={50} />
    </View>
  );
};


