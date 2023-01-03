import React, { createContext, useEffect, useState } from "react";
import { getMethodsContract, getSigner } from "../contract/contract";
import { parseEther } from "ethers/lib/utils";
import { ProviderContractType } from "src/types";
import { initialEventsContract } from "src/contract/eventsContract";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export const ContractContext = createContext({});

/**
 * @description This provider is an api of the StoXCC smart contract and connection metamask.
 * This is where we put the interactions with the contract.
 * With it we get access to the contract from anywhere in the front-end application
 * @param children this wrappwe for JSX.Element where we want put context
 * @param window
 * @param ABI
 * @param eventName
 * @param behaviorEvents
 */
export const ContractProvider = ({ children, window, ABI, eventName, behaviorEvents }: ProviderContractType) => {
    const [account, setAccount] = useState();
    const { ethereum } = window;
    const contractMethods = getMethodsContract(CONTRACT_ADDRESS!, ABI, window);
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

    const contextFunctions = {};

    useEffect(() => {
        checkIfWalletIsConnect();
        initialEventsContract({
            behaviorEvents,
            contractAddress: CONTRACT_ADDRESS!,
            ABI,
            window,
            eventName,
        });
    }, [account]);

    return <ContractContext.Provider value={contextFunctions}>{children}</ContractContext.Provider>;
};
