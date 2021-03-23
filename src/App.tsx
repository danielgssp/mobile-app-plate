import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {navigationRef, isReadyRef} from './routes/RootNavigation.routes';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes/app.routes';

const App: React.FC = () => {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
