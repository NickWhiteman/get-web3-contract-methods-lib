import { ethers } from "ethers";
import { store } from "./redux/store";

interface Window {
    ethereum: unknown; // object Ethereum
}

type ProviderContractType = {
    children: JSX.Element;
    ABI: ContractInterface | string[];
    eventName: string[];
    behaviorEvents: <T>(eventName: string, info: T) => () => void;
};

type RootState = ReturnType<typeof store.getState>;

type ContractDecorateType = {
    children: JSX.Element;
};

type ContractMethodsType = {
    contract: () => unknown;
    getAccount: () => unknown;
    connectWallet: () => Promise<void>;
};
