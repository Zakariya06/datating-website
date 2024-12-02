export interface IReceiptAndroid {
    productId: string;
    transactionDate: number;
    transactionId: string;
    transactionReceipt: string;
    purchaseToken: string;
    dataAndroid: string;
    signatureAndroid: string;
    autoRenewingAndroid: boolean;
    isAcknowledgedAndroid: boolean;
    purchaseStateAndroid: number;
    sandbox?: boolean;
    paketId?: number;
    amount?: number;
}
