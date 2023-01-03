import { ContractInterface, ethers } from "ethers";
import { getContract } from "./contract";
import { Window } from "src/types";

/**
 * @crutch eventName - Need automate get event names. Maybe Types organization ??
 */

/**
 * @description This function collects all events from the contract and subscribes to them.
 * @param {(eventName: string, info: T) => () => void} behaviorEvents
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
 * @param behaviorEvents client-side event handler function
 * @param {ContractInterface} ABI artefact for working with eventa your contract
 * @param {ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc} provider example window.etherium or your case
 * @param {string[]} eventName event array name how writed in contract
 * @howUsed You need to call the function in the root of the application once
 */

export const initialEventsContract = <T>({
    behaviorEvents,
    contractAddress,
    ABI,
    window,
    eventName,
}: {
    behaviorEvents: <T>(eventName: string, info: T) => () => void;
    contractAddress: string;
    ABI: ContractInterface;
    window: Window;
    eventName: string[];
}) => {
    const contract = getContract(contractAddress, ABI, window);

    // listen events
    for (const name of eventName) {
        contract.on(name, (args: T) => {
            const info: T = {
                ...args,
            };

            behaviorEvents<T>(name, info);
        });
    }
};
