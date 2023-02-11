import { useSelector } from "react-redux";

import { RootState } from "src/types";
import { IContractState } from "../types";

const getKeysStore = (state: RootState) => state.ContractReducer;
/**
 * selectStore return IContractState with actual state store on monent call
 */
export const selectStore: IContractState = useSelector(getKeysStore);
