import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ITokenModel } from './token.model';

@Injectable()
export class TokenService {

    private _token: ITokenModel;
    private readonly _tokenKey = '_token';

    constructor(private storage: Storage) { }

    get token(): string {
        return this._token && this._token.token || '';
    }

    set(token: ITokenModel) {
        this._token = token;
        this.storage.set(this._tokenKey, this._token);
    }

    get(): Promise<ITokenModel> {
        if (this._token) {
            return Promise.resolve(this._token);
        }
        return new Promise((resolve, reject) => {
            this.storage.get(this._tokenKey)
                .then(t => {
                    this._token = t;
                    resolve(t);
                }, () => reject());
        });
    }

    clear() {
        this._token = null;
        return this.storage.remove(this._tokenKey);
    }
}