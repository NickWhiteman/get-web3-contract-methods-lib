import { ContractInterface, ethers } from "ethers";

/**
 * @description This function collects all events from the contract and subscribes to them.
 * @param {(eventName: string, info: {from: any, to: any, value: string, event: any}) => () => void} behaviorEvents
 * This function should be implemented on your side. Here you have to implement
 * the processing of all the events of your contract. The function must take 2 parameters. eventName: string and info: {from, to, value, event} -
 * what to do about it depends on your needs and wants.
 * I suggest using switch (event)
 *
 * @example
 *  const exampleFunc = ((
 *      eventName: string,
 *      info: {from: any, to: any, value: string, event: any}
 * ) => {
 *      switch (eventName) {
 *          case 'AnyEventContractName':
 *              return () => someEventHandling(info)
 *          ...
 *          default: break;
 *      }
 * };
 *
 * @param {string} contractAddress string main your app contract 0x10**16
 * @param {ContractInterface} ABI artefact for working with eventa your contract
 * @param {ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc} provider example window.etherium or your case
 * @howUsed You need to call the function in the root of the application once
 */

export const initialEventsContract = (
    behaviorEvents: (eventName: string, info: { from: any; to: any; value: string; data: any }) => () => void,
    contractAddress: string,
    ABI: ContractInterface,
    provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc
) => {
    const providerWeb3 = new ethers.providers.Web3Provider(provider);
    const contract = new ethers.Contract(contractAddress, ABI, providerWeb3);
    const arrayAbi = ABI as Array<any>;

    const events: string[] = arrayAbi.map((abi) =>
        abi.type === "event" && typeof abi.name === "string" ? abi.name : ""
    );

    // listen events
    for (const eventName of events) {
        contract.on(eventName, (from, to, value, event) => {
            const info = {
                from,
                to,
                value: ethers.utils.formatUnits(value, 6),
                data: event,
            };

            // TODO: write logic behavior for events in ./behaviorEvents.ts
            // TODO: maybe have meaning send paramets object info, if this object need for event handling
            behaviorEvents(eventName, info);
        });
    }
};
