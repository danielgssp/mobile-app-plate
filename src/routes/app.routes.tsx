import React, {useState} from 'react';
import Home from '../screens/Home';
import OpenCamera from '../screens/OpenCamera';
import * as RootNavigation from './RootNavigation.routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  createStackNavigator,
  TransitionSpecs,
  StackScreenProps,
} from '@react-navigation/stack';

type RootStackParamList = {
  Home: {};
  OpenCamera: {visibleMenu: boolean};
};

export type Props = StackScreenProps<RootStackParamList, 'OpenCamera'>;

const AppStack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);

  const handlerVisibleMenu = () => {
    setVisibleMenu(!visibleMenu);
    RootNavigation.navigationRef.current?.setParams({
      visibleMenu: !visibleMenu,
    });
  };

  return (
    <View style={styles.container}>
      <AppStack.Navigator
        headerMode="float"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#b900e7',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontSize: 20,
            alignSelf: 'center',
          },
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}>
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Reconhecimento de Placas',
            headerRight: () => (
              <TouchableOpacity
                style={styles.camera}
                onPress={() => RootNavigation.navigate('OpenCamera')}>
                <Icon name="camera" size={24} color="#b900e7" />
              </TouchableOpacity>
            ),
          }}
        />

        <AppStack.Screen
          name="OpenCamera"
          initialParams={{visibleMenu: false}}
          component={OpenCamera}
          options={{
            title: 'Camera',
            headerRight: () => (
              <TouchableOpacity
                style={styles.camera}
                onPress={handlerVisibleMenu}>
                <Icon name="align-justify" size={24} color="#b900e7" />
              </TouchableOpacity>
            ),
          }}
        />
      </AppStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 34,
    height: 34,
    marginRight: 8,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

export default AppRoutes;
