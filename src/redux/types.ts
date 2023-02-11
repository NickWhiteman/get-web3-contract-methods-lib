import { PutEffect } from "redux-saga/effects";
import { RootState } from "src/types";

export type NotificationType = {
    isActive?: boolean;
    mode?: "success" | "info" | "error";
    message?: string;
};

type CustomStore = {
    [key: string]: any;
};

export interface IContractState extends CustomStore {
    isLoading: boolean;
    notification: NotificationType;
}

//TODO: scale payload type
export type ContractSagaWorkerType = {
    [key: string]: ({ payload }: { payload: string }) => Generator<PutEffect<any>, void, unknown>;
};

type Key = keyof IContractState;

export type SelectorsType = {
    [key: keyof IContractState]: (state: RootState) => ReturnType<typeof state.ContractReducer[Key]>;
};
