import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from '@redux-devtools/extension'
import { cardReducer } from './cardReducer.js'
import { thunk } from 'redux-thunk'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cards'],
}

const persistedReducer = persistReducer(persistConfig, cardReducer)

export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)
