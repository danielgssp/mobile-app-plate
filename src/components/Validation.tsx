import React, {useState, useImperativeHandle, forwardRef, Ref} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage, {Keys} from '../service/storage';
import {
  View,
  Text,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export type ValidationRefProps = {
  open: (plate: string) => void;
};

const Validation = forwardRef((_props: {}, ref: Ref<ValidationRefProps>) => {
  const [visible, setVisible] = useState(false);
  const [currentPlate, setPlate] = useState('');
  const [edit, setEdit] = useState(false);

  const handlerVisible = () => {
    setVisible(!visible);
  };

  const handlerEdit = () => {
    setEdit(!edit);
  };

  useImperativeHandle(ref, () => ({
    open: (plate: string) => {
      handlerVisible();
      setPlate(plate);
    },
  }));

  const onSavePlate = async () => {
    let plateList = await Storage.select<String[]>(Keys.plates);

    if (plateList) {
      plateList = [...plateList, currentPlate];
    } else {
      plateList = [currentPlate];
    }

    await Storage.insert(Keys.plates, plateList);
    handlerVisible();
    onMessageSuccess();
  };

  const onMessageSuccess = () => {
    Alert.alert('Sucesso', 'Placa cadastrada!', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={handlerVisible}>
        <View style={styles.content}>
          <Text style={styles.title}>Verificação da placa para cadastro</Text>

          <View style={styles.textInputArea}>
            <Text style={styles.plateText}>Placa:</Text>
            <TextInput
              style={styles.input}
              maxLength={7}
              editable={edit}
              value={currentPlate}
              onChangeText={setPlate}
            />
            <TouchableOpacity style={styles.editInput} onPress={handlerEdit}>
              <Icon
                name={edit ? 'check-square-o' : 'edit'}
                size={24}
                color="#b900e7"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handlerVisible}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onSavePlate}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#b900e7',
    textAlign: 'center',
  },
  container: {},
  content: {
    marginTop: 8,
  },
  textInputArea: {
    margin: 42,
    minHeight: 98,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#00CC00',
    borderStyle: 'dashed',
  },
  input: {
    fontSize: 24,
  },
  editInput: {
    marginLeft: 24,
  },
  plateText: {
    fontSize: 24,
    marginRight: 14,
  },
  buttonsContainer: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 148,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#b900e7',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 24,
  },
});

export default Validation;
