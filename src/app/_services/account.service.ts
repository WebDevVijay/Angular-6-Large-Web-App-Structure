import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../_modals/appSettings';
import { ServiceCall } from './servicecall.service'

@Injectable()
export class AccountService {

    constructor(private obj: ServiceCall) {
    }
    RegisterUser(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.RegisterUser, user);
    }
    ValidateLogin(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.ValidateLogin, user);
    }
}