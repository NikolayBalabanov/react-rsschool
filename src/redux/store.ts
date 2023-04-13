import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
const store = setupStore();

export default store;
export type RooteState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
