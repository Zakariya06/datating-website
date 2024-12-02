import isArray from '../../../core/typeguards/isArray';
import isObject from '../../../core/typeguards/isObject';

export interface IError {
    message: string;
    Note: string;
    _embedded: IErrorList;
}

interface IErrorList {
    errors: ISingleError[];
}

interface ISingleError {
    message: string;
    constraints: [];
}

export interface IErrorDebug extends IError {
    exception_class: string;
    file: string;
    line: string;
    description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isError = (x: any): x is IError =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isArray<any>(x) && x.length === 1 && 'Note' in x[0] && x[0]['Note'] !== 'Success';

// isObject(x) && 'message' in x
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDebugErrorInfo = (x: any): x is IErrorDebug => isObject(x) && 'message' in x;
