import { ethers } from "ethers";

export type Window = {
    ethereum: any; // object Ethereum
};

export type ProviderContractType = {
    children: JSX.Element;
    window: Window & typeof globalThis;
    ABI: ContractInterface | string[];
    eventName: string[];
    behaviorEvents: <T>(eventName: string, info: T) => () => void;
};
