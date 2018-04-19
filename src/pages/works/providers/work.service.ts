import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkService {
    constructor(private httpClient: HttpClient) { }

    getWorks(pageIndex: number, pageSize: number) {
        console.log(pageIndex);
        console.log(pageSize);
        return this.httpClient.get('assets/data.json');
    }
}
