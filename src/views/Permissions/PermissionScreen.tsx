import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { Switch } from 'react-native-paper';
import { useState } from 'react';

export const PermissionScreen = () => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      {/* <FullScreenLoader/> */}
      <Text>Habilitar ubicacion</Text>

            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />




    </View>
  );
};
