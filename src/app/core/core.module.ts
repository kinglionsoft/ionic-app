import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as providers from './providers';
import { DefaultInterceptor } from './net/default.interceptor';
import { StartupService } from './startup/startup.service';

const PROVIDERS = [
    providers.MessageBox,
    providers.LoadingService,
    providers.PlatformService
];

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        ...PROVIDERS
    ]
})
export class CoreModule { }
