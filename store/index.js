import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers'; /* The value from combineReducers */

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['user', 'cart'],
	stateReconciler: autoMergeLevel2 /* See "Merge Process" section for details. */
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);