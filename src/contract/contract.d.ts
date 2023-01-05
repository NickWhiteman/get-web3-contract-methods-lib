import { Contract, ContractInterface, ethers } from "ethers";

export const getSigner = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    return signer;
};

export const getContract = (contractAddress: string, ABI: ContractInterface | string[]): Contract => {
    const signer = getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract;
};

/**
 * @description This function collects an object with contract methods.
 * @param {string} contractAddress string main your app contract 0x10**16
 * @param {ContractInterface} ABI artefact for working with eventa your contract
 * @param {ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc} provider example window.etherium or your case
 * @returns {T} This type you need developing on your side and send how generic inside this function
 * @howUsed This method is called on React components. After the call, you can call to the contract.
 *
 * @example
 * ... In some React component ...
 * const contract: SomeContractType = getMethodsContract<SomeContractType>(
 *      contractAddress,
 *      ABI,
 *      provider
 * );
 *
 * const anyAction = async () => {
 *      await contract.anyMethodContract()
 *          .then()
 *          .catch()
 * }
 * ...
 * <Button onClick={anyAction} children='Example registration' />
 */

export const getMethodsContract = <T>(contractAddress: string, ABI: ContractInterface | string[]): T => {
    const contract = getContract(contractAddress, ABI);

    const methodsContract = Object.fromEntries(
        Object.entries(contract).filter(([key, value]) => Object.keys({} as T).includes(key))
    ) as T;

    return methodsContract;
};
