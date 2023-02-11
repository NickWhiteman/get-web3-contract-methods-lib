import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContractState, NotificationType } from "../types";

const initialState: IContractState = {
    isLoading: false,
    notification: {
        isActive: false,
        mode: undefined,
        message: undefined,
    },
};

export const ContractStore = createSlice({
    name: "Contracttore",
    initialState,
    reducers: {
        isLoading(state) {
            state.isLoading = !state.isLoading;
        },
        notification(state, { payload }: PayloadAction<NotificationType>) {
            state.notification = payload;
        },
        notificationClose(state) {
            state.notification = {
                isActive: false,
                mode: undefined,
                message: undefined,
            };
        },
    },
});

export const ContractStoreActions = {
    ...ContractStore.actions,
};

export const ContractReducer = ContractStore.reducer;
