export declare class Result<T> {
    private readonly _value?;
    private readonly _error?;
    private constructor();
    static success<U>(value?: U): Result<U>;
    static failure<U>(error: Error): Result<U>;
    isSuccess(): boolean;
    isFailure(): boolean;
    getValue(): T;
    getError(): Error;
}
