import { ContractInterface, ethers } from "ethers";

//TODO: You can increase the level of abstraction
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

export const getMethodsContract = <T>(
    contractAddress: string,
    ABI: ContractInterface,
    provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc
): T => {
    const providerWeb3 = new ethers.providers.Web3Provider(provider);
    const signer = providerWeb3.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const contractKey = Object.keys({} as T);

    const methodsContract = Object.fromEntries(
        Object.entries(contract).filter(([key, value]) => contractKey.includes(key) === true && [key, value])
    ) as T;

    return methodsContract;
};
