import { Injector } from '@angular/core';
import { Events } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

import { MessageBox, AppConstants, ITokenModel } from '@core';

/**业务基类 */
export abstract class AppBaseComponent {

    // TODO: 定义公共属性
    messageBox: MessageBox;
    userLogin: Subject<ITokenModel>;
    userLogout: Subject<any>;

    constructor(public injector: Injector) {
        this.messageBox = this.injector.get(MessageBox);

        this.userLogin = new Subject<ITokenModel>();
        this.userLogout = new Subject<any>();
        let event = this.injector.get(Events);
        event.subscribe(AppConstants.events.USER_LOGIN, (user: ITokenModel) => {
            this.userLogin.next(user);
        });
        event.subscribe(AppConstants.events.USER_LOGOUT, () => {
            this.userLogout.next();
        });
    }

    // TODO: 定义公共方法
}