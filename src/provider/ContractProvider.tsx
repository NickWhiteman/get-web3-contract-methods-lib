import { parseEther } from "ethers/lib/utils";
import { createContext, useEffect, useState } from "react";
import { getMethodsContract } from "../contract/contract";
import { initialEventsContract } from "src/contract/eventsContract";
import { ProviderContractType, Window } from "src/types";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const { ethereum } = window;

export const ContractContext = createContext({});

/**
 * @description This provider is an api of the StoXCC smart contract and connection metamask.
 * This is where we put the interactions with the contract.
 * With it we get access to the contract from anywhere in the front-end application
 * @param children this wrappwe for JSX.Element where we want put context
 * @param ABI
 * @param eventName
 * @param behaviorEvents
 */
export const ContractProvider = ({ children, ABI, eventName, behaviorEvents }: ProviderContractType) => {
    const [account, setAccount] = useState<unknown>();
    const contractMethods = getMethodsContract(CONTRACT_ADDRESS!, ABI);
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
            if (!ethereum) console.log("Please install MetaMask.");

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
    };

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
