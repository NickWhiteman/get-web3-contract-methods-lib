import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '../../interact';
import { behaviorEvents } from './behaviorEvents';
import BEP20ABI from './BEP20ABI.json';

/**
 * @description This function collects all events from the contract and subscribes to them.
 * @howUsed You need to call the function in the root of the application once
 */
export const initialEventsContract = () => {
    try {
        if (!window.ethereum) {
            throw new Error('Ethereum is not available');
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);        
        const contract = new ethers.Contract(
            '0x52Ec8c87FC09C1eF75fAe44139cE8A0A425f9B40', 
            BEP20ABI, 
            provider
        );
        
        const events: string[] = BEP20ABI.map((abi) => 
            abi.type === 'event' && 
            typeof abi.name === 'string' ? abi.name : ''
        );
        
        // listen events
        for (const eventName of events) {
            contract.on(eventName, (from, to, value, event) => {
                // const info = {
                //     from,
                //     to,
                //     value: ethers.utils.formatUnits(value, 6),
                //     data: event
                // }
                
                // TODO: write logic behavior for events in ./behaviorEvents.ts
                // TODO: maybe have meaning send paramets object info, if this object need for event handling
                behaviorEvents(eventName);
            });
        }
    } catch(e) {
        console.error(e);
    }
};
