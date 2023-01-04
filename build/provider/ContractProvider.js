import { jsx as _jsx } from "react/jsx-runtime";
import { parseEther } from "ethers/lib/utils";
import { createContext, useEffect, useState } from "react";
import { getMethodsContract } from "../contract/contract";
import { initialEventsContract } from "src/contract/eventsContract";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const { ethereum } = window;
export const ContractContext = createContext({});
export const ContractProvider = ({ children, ABI, eventName, behaviorEvents }) => {
    const [account, setAccount] = useState();
    const contractMethods = getMethodsContract(CONTRACT_ADDRESS, ABI);
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
            if (!ethereum)
                console.log("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };
    const checkIfWalletIsConnect = async () => {
        try {
            connectWallet();
        }
        catch (error) {
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
            contractAddress: CONTRACT_ADDRESS,
            ABI,
            eventName,
        });
    }, [account]);
    return _jsx(ContractContext.Provider, { value: contextFunctions, children: children });
};
//# sourceMappingURL=ContractProvider.js.map