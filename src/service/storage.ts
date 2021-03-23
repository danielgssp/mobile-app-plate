import AsyncStorage from '@react-native-community/async-storage';

class ServiceStorage {
  async insert(key: string, data: any): Promise<boolean> {
    return await AsyncStorage.setItem(key, JSON.stringify(data))
      .then(() => true)
      .catch(() => false);
  }

  select = async <T>(key: string): Promise<T | null> => {
    try {
      const data = await AsyncStorage.getItem(key);
      const hasData = !!data;

      if (hasData && data !== null) {
        return JSON.parse(data);
      }

      return null;
    } catch (error) {
      return error;
    }
  };

  async delete(key: string): Promise<boolean> {
    return await AsyncStorage.removeItem(key)
      .then(() => true)
      .catch(() => false);
  }
}

const Keys = {
  plates: '@plates:key',
};

export {Keys};
export default new ServiceStorage();
