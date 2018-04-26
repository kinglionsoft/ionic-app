import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { mergeMap, catchError } from 'rxjs/operators';
import { Environment } from '@env';
import { MessageBox } from '@core';
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    get msg(): MessageBox {
        return this.injector.get(MessageBox);
    }

    private goTo(url: string) {
        console.log(url);
        //  setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private isApi(url: string) {
        return url.startsWith(`${Environment.SERVER_URL}/api/`);
    }

    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        // 业务处理：一些通用操作
        switch (event.status) {
            case 200:
                // 业务层级错误处理
                if (this.isApi(event.url)) {
                    const body: any = event instanceof HttpResponse && event.body;
                    if (body && !body.success) {
                        this.msg.error(body.error);
                        // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
                        // this.http.get('/').subscribe() 并不会触发
                        return ErrorObservable.throw(event);
                    }
                }
                break;
            case 401: // 未登录状态码
                this.goTo('/passport/login');
                break;
            case 403:
            case 404:
            case 500:
                this.goTo(`/${event.status}`);
                break;
        }
        return of(event);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        // 统一加上服务端前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('./assets/')) {
            url = Environment.SERVER_URL + url;
        }

        const newReq = req.clone({
            url: url
        });

        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                if (event instanceof HttpResponse && event.status === 200)
                    return this.handleData(event);
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err))
        );
    }
}
