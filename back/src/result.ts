export class Result<T> {
  private readonly _value?: T;
  private readonly _error?: Error;

  private constructor(value?: T, error?: Error) {
    this._value = value;
    this._error = error;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(value, undefined);
  }

  public static failure<U>(error: Error): Result<U> {
    return new Result<U>(undefined, error);
  }

  public isSuccess(): boolean {
    return this._error === undefined;
  }

  public isFailure(): boolean {
    return !this.isSuccess();
  }

  public getValue(): T {
    if (this.isFailure()) {
      throw new Error('Cannot get the value of an error result');
    }
    return this._value as T;
  }

  public getError(): Error {
    if (this.isSuccess()) {
      throw new Error('Cannot get the error of a success result');
    }
    return this._error as Error;
  }
}
