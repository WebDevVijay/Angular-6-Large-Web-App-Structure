import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';
@Injectable()
export class ServiceCall {
    UserData: any;
    constructor(private http: HttpClient, private storageService: StorageService) {
    }
    PostCall(apiName: string = "", para: any = null): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        var parameter = null;
        if (para) {
            parameter = JSON.stringify(para);
        }
        return this.http.post(apiName, parameter, {
            headers: headers
        })
    }
}