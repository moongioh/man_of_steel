"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(value, error) {
        this._value = value;
        this._error = error;
    }
    static success(value) {
        return new Result(value ?? null, null);
    }
    static failure(error) {
        return new Result(null, error);
    }
    isSuccess() {
        return this._error === null;
    }
    isFailure() {
        return !this.isSuccess();
    }
    getValue() {
        if (!this.isSuccess()) {
            throw new Error('Cannot get the value of an error result');
        }
        return this._value;
    }
    getError() {
        if (this.isSuccess()) {
            throw new Error('Cannot get the error of a success result');
        }
        return this._error;
    }
    map(fn) {
        if (this.isSuccess()) {
            return Result.success(fn(this._value));
        }
        else {
            return Result.failure(this._error);
        }
    }
    forEach(fn) {
        if (this.isSuccess()) {
            fn(this._value);
        }
    }
    fold(onSuccess, onFailure) {
        if (this.isSuccess()) {
            return onSuccess(this._value);
        }
        else {
            return onFailure(this._error);
        }
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map