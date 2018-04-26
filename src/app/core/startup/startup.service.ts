import { Injectable } from '@angular/core';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor() {
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088

        return new Promise((resolve) => {
            console.log('app is started');
            resolve(null);
        });
    }
}
