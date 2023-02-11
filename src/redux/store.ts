import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import contractReducer from "./rootReducer";
import { contractSaga } from "./saga/root-saga";

export const contractSagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: contractReducer,
    middleware: [contractSagaMiddleware],
});

contractSagaMiddleware.run(contractSaga);
