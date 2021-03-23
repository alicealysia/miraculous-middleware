export enum ErrorTypes {
    SignInFailure = 0,
    TokenExpired = 1
}

export interface ErrorStructure {
    type: ErrorTypes;
    message: string;
    possibleNulls: any[];
}