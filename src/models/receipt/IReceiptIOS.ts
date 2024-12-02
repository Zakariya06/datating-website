export interface IReceiptIOS {
    productId: string;
    transactionDate: number;
    transactionId: string;
    transactionReceipt: string;
    sandbox?: boolean;
    paketId?: number;
    amount?: number;
}
