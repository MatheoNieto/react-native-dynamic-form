import {
	MMKVLoader,
	useIndex,
	useMMKVStorage,
} from 'react-native-mmkv-storage';

const Storage = new MMKVLoader().withInstanceID('fl-storage').initialize();

export { useIndex, useMMKVStorage };
export default Storage;


export enum PROPERTIES_STORE_TYPE {
	DATA_USER = 'data_user',
}
