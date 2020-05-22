class Print {
    private _log(str: string) {
        console.log(str)
        return this;
    }
    warn(str: string) {
        return this._log(`\x1b[33m${str}`);
    }
    primary(str: string) {
        return this._log(`\x1b[34m${str}`);
    }
    keyword(str: string) {
        return this._log(`\x1b[35m${str}`);
    }
    log(str: string = "") {
        return this._log(`\x1b[30m${str}`);
    }
    info(str: string) {
        return this._log(`\x1b[36m${str}`);
    }
    error(str: string) {
        return this._log(`\x1b[31m${str}`);

    }
    success(str: string) {
        return this._log(`\x1b[32m${str}`);
    }
}
export default new Print();
