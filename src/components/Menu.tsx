import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, StyleSheet, View, Text, Switch} from 'react-native';

interface Props {
  flashEnable: boolean;
  setFlashEnable: (flashEnable: boolean) => void;
  landscapeEnable: boolean;
  setLandscapeEnable: (landscapeEnable: boolean) => void;
}

const Menu: React.FC<Props> = ({
  flashEnable,
  setFlashEnable,
  landscapeEnable,
  setLandscapeEnable,
}) => {
  const toggleFlash = () => setFlashEnable(!flashEnable);
  const toggleLandscape = () => setLandscapeEnable(!landscapeEnable);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textMenu}>Opções da Camera</Text>
      <View style={styles.divider} />
      <View style={styles.content}>
        <Icon name="flash" size={18} />
        <Text> Ligado / Desligado: </Text>
        <Switch
          trackColor={{false: '#767577', true: '#000'}}
          thumbColor={flashEnable ? '#b900e7' : '#f4f3f4'}
          onValueChange={toggleFlash}
          value={flashEnable}
        />
      </View>
      <View style={styles.content}>
        <Icon name="camera" size={18} />
        <Text> Vertical / Horizontal: </Text>
        <Switch
          trackColor={{false: '#767577', true: '#000'}}
          thumbColor={landscapeEnable ? '#b900e7' : '#f4f3f4'}
          onValueChange={toggleLandscape}
          value={landscapeEnable}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 84,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  divider: {
    borderBottomColor: '#C3C3C3C3',
    borderBottomWidth: 1,
  },
  textMenu: {
    margin: 8,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default Menu;
