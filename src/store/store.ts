
import { configureStore } from '@reduxjs/toolkit';

import cvSlice from '../reducers/cvReducer'
import arraySlice from '../reducers/arrayCvReducer'
import indexSlice from '../reducers/indexReducer';

import listener from './listenerMiddleware';

const store = configureStore({
    reducer: {
        cvs: arraySlice,
        cV: cvSlice,
        index: indexSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listener.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
