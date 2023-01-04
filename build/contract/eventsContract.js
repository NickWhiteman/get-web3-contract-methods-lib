import { getContract } from "./contract";
export const initialEventsContract = ({ behaviorEvents, contractAddress, ABI, eventName, }) => {
    const contract = getContract(contractAddress, ABI);
    for (const name of eventName) {
        contract.on(name, (args) => {
            const info = {
                ...args,
            };
            behaviorEvents(name, info);
        });
    }
};
//# sourceMappingURL=eventsContract.js.map