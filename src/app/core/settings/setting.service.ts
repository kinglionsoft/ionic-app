import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {
    private _settings: any = {};
    constructor() { }

    set(key: string, value: any) {
        this._settings[key] = value;
    }

    get(key: string): any {
        return this._settings[key];
    }

    getItem<T>(key: string): T {
        return this.get(key) as T;
    }
}
