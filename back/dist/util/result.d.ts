export declare class Result<T> {
    private readonly _value;
    private readonly _error;
    private constructor();
    static success<U>(value?: U): Result<U>;
    static failure<U>(error: Error): Result<U>;
    isSuccess(): boolean;
    isFailure(): boolean;
    getValue(): T;
    getError(): Error;
    map<U>(fn: (value: T) => U): Result<U>;
    forEach(fn: (value: T) => void): void;
    fold<U>(onSuccess: (value: T) => U, onFailure: (error: Error) => U): U;
}
