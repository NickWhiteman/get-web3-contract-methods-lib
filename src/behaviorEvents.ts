export const behaviorEvents = (event: string) => {
    switch (event) {
        case 'Line5BuyLevel': return () => {
            return;
        } 
        case 'Line5MissedPayment': return () => {
            return;
        }
        case 'Line5Payment': return () => {
            return;
        }
        case 'MatrixBuyLevel': return () => {
            return;
        }
        case 'MatrixMissedPayment': return () => {
            return;
        }
        case 'MatrixReinvest': return () => {
            return;
        }
        case 'MatrixUpgrade': return () => {
            return;
        }
        case 'MissedEthReceive': return () => {
            return;
        }
        case 'MissedMatrixUpgrade': return () => {
            return;
        }
        case 'Payment': return () => {
            return;
        }
        case 'UserRegistered': return () => {
            return;
        }
        default: break;
    }
}