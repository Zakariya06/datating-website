export interface ILocalImage {
    cancelled: boolean;
    height: number;
    type: string;
    uri: string;
    width: number;
    base64: string;
}

export const EmptyLocalImage: ILocalImage = {
    cancelled: false,
    height: 0,
    type: 'image',
    uri: '',
    width: 0,
    base64: '',
};
