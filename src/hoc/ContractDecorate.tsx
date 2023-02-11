import { FC } from "react";
import styled from "styled-components";

import { ContractDecorateType } from "src/types";
import { Loader } from "./components/Loader";
import { selectStore } from "src/redux/selectors/selectors-out-store";

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

export const ContractDecorate: FC<ContractDecorateType> = ({ children }) => {
    const { isLoading } = selectStore;

    return isLoading ? (
        <StyledLoader>
            <Loader />
        </StyledLoader>
    ) : (
        <>{children}</>
    );
};
