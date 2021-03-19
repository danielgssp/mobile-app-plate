import React from 'react';
import Home from '../screens/Home';
import OpenCamera from '../screens/OpenCamera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';

Icon.loadFont();

type RootStackParamList = {
  Home: {};
  OpenCamera: {platePattern: boolean};
};

const AppStack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
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
              <TouchableOpacity>
                {/* <Icon name="glass" size={30} /> */}
              </TouchableOpacity>
            ),
          }}
        />

        <AppStack.Screen
          name="OpenCamera"
          component={OpenCamera}
          options={{title: 'Camera'}}
        />
      </AppStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRoutes;
