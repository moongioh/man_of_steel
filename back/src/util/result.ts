// src/util/result.ts

export class Result<T> {
  private readonly _value: T | null;
  private readonly _error: Error | null;

  private constructor(value: T | null, error: Error | null) {
    this._value = value;
    this._error = error;
  }

  // 성공 결과 생성
  public static success<U>(value?: U): Result<U> {
    return new Result<U>(value ?? null, null);
  }

  // 실패 결과 생성
  public static failure<U>(error: Error): Result<U> {
    return new Result<U>(null, error);
  }

  public isSuccess(): boolean {
    return this._error === null;
  }

  public isFailure(): boolean {
    return !this.isSuccess();
  }

  public getValue(): T {
    if (!this.isSuccess()) {
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

  // map 함수 추가
  public map<U>(fn: (value: T) => U): Result<U> {
    if (this.isSuccess()) {
      return Result.success(fn(this._value as T));
    } else {
      return Result.failure<U>(this._error as Error);
    }
  }

  // forEach 함수 추가
  public forEach(fn: (value: T) => void): void {
    if (this.isSuccess()) {
      fn(this._value as T);
    }
  }

  // fold 함수 추가
  public fold<U>(
    onSuccess: (value: T) => U,
    onFailure: (error: Error) => U,
  ): U {
    if (this.isSuccess()) {
      return onSuccess(this._value as T);
    } else {
      return onFailure(this._error as Error);
    }
  }
}
