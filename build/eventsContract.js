import { ethers } from "ethers";
export const initialEventsContract = (behaviorEvents, contractAddress, ABI, provider) => {
    const providerWeb3 = new ethers.providers.Web3Provider(provider);
    const contract = new ethers.Contract(contractAddress, ABI, providerWeb3);
    const arrayAbi = ABI;
    const events = arrayAbi.map((abi) => abi.type === "event" && typeof abi.name === "string" ? abi.name : "");
    for (const eventName of events) {
        contract.on(eventName, (from, to, value, event) => {
            const info = {
                from,
                to,
                value: ethers.utils.formatUnits(value, 6),
                data: event,
            };
            behaviorEvents(eventName, info);
        });
    }
};
//# sourceMappingURL=eventsContract.js.map