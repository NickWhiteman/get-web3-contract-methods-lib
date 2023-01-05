import { ethers } from "ethers";

interface Window {
    ethereum: unknown; // object Ethereum
}

type ProviderContractType = {
    children: JSX.Element;
    ABI: ContractInterface | string[];
    eventName: string[];
    behaviorEvents: <T>(eventName: string, info: T) => () => void;
};

type ContractType = {
    contract: () => unknown;
    getAccount: () => unknown;
    connectWallet: () => Promise<void>;
};
