import { ethers } from "ethers";
export const getSigner = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
};
export const getContract = (contractAddress, ABI) => {
    const signer = getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    return contract;
};
export const getMethodsContract = (contractAddress, ABI) => {
    const contract = getContract(contractAddress, ABI);
    const methodsContract = Object.fromEntries(Object.entries(contract).filter(([key, value]) => Object.keys({}).includes(key)));
    return methodsContract;
};
//# sourceMappingURL=contract.js.map