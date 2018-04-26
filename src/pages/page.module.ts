import { NgModule } from '@angular/core';

import { WorkModule } from './works/work.module';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        HttpModule,
        WorkModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class PageModule { }
