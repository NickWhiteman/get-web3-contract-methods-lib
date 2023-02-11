import { FC, useEffect } from "react";
import styled from "styled-components";

import { ContractDecorateType } from "src/types";
import { Loader } from "../components/loader";
import { Notification } from "../components/notification/Notification";
import { selectStore } from "src/redux/selectors/selectors-out-store";
import { InitStoreContract } from "src/redux/contract-reducer";

const StyledLoader = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    position: fixed;
`;

export const { ContractStoreActions, ContractReducer } = InitStoreContract(
    {}, // this reducer
    {
        isLoading: false,
        notification: {
            isActive: false,
            mode: undefined,
            message: undefined,
        },
    } // this initState store
);

export const ContractDecorate: FC<ContractDecorateType> = ({ children, initStateContractStore: {} }) => {
    const { isLoading } = selectStore;

    return (
        <Notification>
            {isLoading ? (
                <StyledLoader>
                    <Loader />
                </StyledLoader>
            ) : (
                <>{children}</>
            )}
        </Notification>
    );
};
