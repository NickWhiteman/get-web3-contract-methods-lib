type L5 = {
    referalsList: number[]
    activeTo: number
}

type M3 =  Pick<L5, 'referalsList'> & {
    isActive: boolean
    wasUpgraded: boolean
    reinvestCount: number
}

type M6 = M3;

export type UserData = {
    address: string
    l5: L5
    m3: M3
    m6: M6
}

/**
 * @description This type described contract methodth for logic connect node
 */
export interface ContractMethods {
    // read methods
    activeToken: () => Promise<string>
    ethToUsdPath: () => Promise<string>
    getUserData: () => Promise<UserData>
    line5Costs: () => Promise<number>
    line5Percents: () => Promise<number>
    priceMultiplier: () => Promise<bigint>
    router: () => Promise<string>
    tokenToUsdPath: () => Promise<string>
    uplineOf: () => Promise<bigint>
    userToId: () => Promise<bigint>
    isTokenHalvingEnabled: () => Promise<boolean>
    // write methods
    register: (refId: number) => Promise<void>
    buyM3: (amountBnb: number, level: number) => Promise<void>
    buyM6: (amountBnb: number, level: number) => Promise<void>
    buyLine5: (amountBnb: number, level: number, mounths: number) => Promise<void>
    switchTokenHalving: (tokenAddress: string, enabledStatus: boolean, tokenToUsdPath: string[]) => Promise<void>
}