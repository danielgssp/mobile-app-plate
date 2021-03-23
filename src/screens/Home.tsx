import React, {useEffect, useState} from 'react';
import Storage, {Keys} from '../service/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Home: React.FC = () => {
  const [text, setText] = useState('');
  const [plates, setPlates] = useState<String[]>();
  const [plateFilter, setPlateFilter] = useState<String[]>();

  async function getPlates() {
    const listPlates = await Storage.select<String[]>(Keys.plates);

    if (listPlates) {
      setPlates(listPlates);
    }
  }

  useEffect(() => {
    getPlates();
  }, []);

  const searchFilter = (value: string) => {
    let filtered = plates?.filter(plate =>
      plate.toUpperCase().includes(value.toUpperCase()),
    );

    if (value) {
      setPlateFilter(filtered);
    } else {
      setPlateFilter(plates);
    }

    setText(value);
  };

  useEffect(() => {}, [plates, text]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refresh} onPress={getPlates}>
        <Icon name="refresh" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={searchFilter}
          placeholder="Buscar por placa"
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listText}>Lista de Placas cadastradas</Text>
        <ScrollView style={styles.list}>
          {plateFilter?.map((it, id) => {
            return (
              <Text style={styles.plateText} key={id}>
                {it}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plateText: {
    fontSize: 18,
  },
  input: {
    fontSize: 18,
  },
  listContainer: {
    flex: 1,
    margin: 8,
  },
  list: {
    margin: 8,
  },
  listText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputArea: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  refresh: {
    zIndex: 9999,
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 48,
    height: 48,
    marginLeft: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b900e7',
  },
});

export default Home;
