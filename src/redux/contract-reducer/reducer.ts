import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";

/**
 * InitStoreContract - This method need call in time started your app for state initialization for save result after call contract methods and save this results in app  state. 
 * Returned object Store, object store actions, object reducer for integration with your app
 * @param reducer - object for createSlice({reducers: ...})
 * @example reducers: {
                        ...reducer,
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
 * @param initialState base state store for contract values
 * @returns ContractStore, ContractStoreActions, ContractReducer,
 */
export const InitStoreContract = (reducer: {}, initialState: { [key: string]: unknown }) => {
    const ContractStore = createSlice({
        name: "Contracttore",
        initialState,
        reducers: {
            ...reducer,
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

    const ContractStoreActions = {
        ...ContractStore.actions,
    };

    const ContractReducer = ContractStore.reducer;

    return {
        ContractStore,
        ContractStoreActions,
        ContractReducer,
    };
};
