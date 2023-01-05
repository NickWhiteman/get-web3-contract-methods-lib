import { parseEther } from "ethers/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

import { getMethodsContract } from "src/contract/contract";
import { initialEventsContract } from "src/contract/eventsContract";
import { ContractType, ProviderContractType, Window } from "src/types";

const { ethereum } = window;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

/**
 * @description this hoc return Provider
 * @generic T this custom type for context object need implements on client side
 * @generic K this custom type method contract need implements on client side
 *
 * Parameters for Provider
 * @param children this wrappwe for JSX.Element where we want put context
 * @param {ContractInterface | string[]} ABI this JSON or array string object for initional contract
 * @param {string[]} eventName array contains contract event names to automate event signing
 * @param {<T>(eventName: string, info: T) => () => void} behaviorEvents this function implements on size client side
 */
export const useContextEthers = function <T, K>() {
    const ContractContext = createContext({} as ContractType & T);

    return ({ children, ABI, eventName, behaviorEvents }: ProviderContractType) => {
        const [account, setAccount] = useState<string>("");
        const contractMethods = getMethodsContract<K>(CONTRACT_ADDRESS!, ABI);
        const gasLimit = parseEther("0.0000000000021");

        const getAccount = () => {
            if (account) {
                return account;
            }
        };

        const contract = () => {
            return contractMethods;
        };

        const connectWallet = async () => {
            try {
                if (!ethereum) throw new Error("Please install MetaMask.");

                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
            } catch (error) {
                console.log(error);
                throw new Error("No ethereum object");
            }
        };

        const checkIfWalletIsConnect = async () => {
            try {
                connectWallet();
            } catch (error) {
                console.log(error);
            }
        };

        const contextFunctions = {
            contract,
            getAccount,
            connectWallet,
        } as ContractType & T;

        useEffect(() => {
            checkIfWalletIsConnect();
            initialEventsContract({
                behaviorEvents,
                contractAddress: CONTRACT_ADDRESS!,
                ABI,
                eventName,
            });
        }, [account]);

        return <ContractContext.Provider value={contextFunctions}>{children}</ContractContext.Provider>;
    };
};
