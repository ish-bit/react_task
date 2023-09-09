import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import appReducer from './feature/appSlice'
import { employeeService } from "./services/employeService";
import { apiSlice } from './services/apiSlice';



const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['api'],
}

export const rootReducers = combineReducers({
  // Add the generated reducer as a specific top-level slice
  app: appReducer,
  [apiSlice.reducerPath] : apiSlice.reducer,
  [employeeService.reducerPath]: employeeService.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware:any) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat([
    apiSlice.middleware,
    employeeService.middleware,
  ]),
  devTools: true
});

setupListeners(store.dispatch);