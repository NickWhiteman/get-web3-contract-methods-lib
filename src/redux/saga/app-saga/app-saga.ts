import { call, put, PutEffect, select } from "redux-saga/effects";

import { getMethodsContract } from "src/contract/contract";
import { ContractStoreActions } from "src/hoc/contract-decorator/ContractDecorate";
import { ContractSagaWorkerType } from "src/redux/types";
import { ContractMethodsType } from "src/types";
import { ContractSagaAction } from "./saga-actions";

const contract = getMethodsContract<ContractMethodsType>(process.env.CONTRACT_ADDRESS!, []);

/**
 * example how write saga workers
 */
export const ContractSagaWorker: ContractSagaWorkerType = {
    exampleWorker: function* ({ payload }: { payload: string }) {
        try {
            const tmp = payload;
            yield put(ContractStoreActions.isLoading());
            yield put(ContractStoreActions.isLoading());
        } catch (error) {
            const { message } = error as { message: string };
            yield put(ContractStoreActions.isLoading());
            yield put(
                ContractSagaAction["notification"]!({
                    isActive: true,
                    mode: "error",
                    message: message,
                })
            );
        }
    },
};
