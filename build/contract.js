import { ethers } from "ethers";
export const getMethodsContract = (contractAddress, ABI, provider) => {
    const providerWeb3 = new ethers.providers.Web3Provider(provider);
    const signer = providerWeb3.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const contractKey = Object.keys({});
    const methodsContract = Object.fromEntries(Object.entries(contract).filter(([key, value]) => contractKey.includes(key) === true && [key, value]));
    return methodsContract;
};
//# sourceMappingURL=contract.js.map