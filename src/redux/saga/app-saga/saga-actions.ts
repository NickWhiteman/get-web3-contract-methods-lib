import { ActionCreatorWithPayload, ActionCreatorWithPreparedPayload, createAction } from "@reduxjs/toolkit";
import { ContractSagaWorker } from "./app-saga";

// TODO: need think about this
let ContractSagaAction: {
    [key: string]:
        | void
        | ActionCreatorWithPreparedPayload<unknown[], unknown, string, unknown, unknown>
        | ActionCreatorWithPayload<any, string>;
};

Object.keys(ContractSagaWorker).forEach((key: string) => {
    ContractSagaAction[key] = createAction<any>(key.toUpperCase(), ContractSagaWorker[key]);
});

export { ContractSagaAction };
