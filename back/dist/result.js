"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(value, error) {
        this._value = value;
        this._error = error;
    }
    static success(value) {
        return new Result(value, undefined);
    }
    static failure(error) {
        return new Result(undefined, error);
    }
    isSuccess() {
        return this._error === undefined;
    }
    isFailure() {
        return !this.isSuccess();
    }
    getValue() {
        if (this.isFailure()) {
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
}
exports.Result = Result;
//# sourceMappingURL=result.js.map