import { combineReducers } from "redux";
import { ContractReducer } from "./contract-reducer/reducer";

const contractReducer = combineReducers({
    ContractReducer,
});

export default contractReducer;
