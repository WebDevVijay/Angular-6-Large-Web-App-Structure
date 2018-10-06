import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../_modals/appSettings';
import { ServiceCall } from './servicecall.service'

@Injectable()
export class ContactBookService {

    constructor(private obj: ServiceCall) {
    }
    AddContactBook(book: any): Observable<any> {
        return this.obj.PostCall(AppSettings.AddContactBook, book);
    }
    GetContactBookList(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.GetContactBookList, user);
    }
    GetContactBookById(obj: any): Observable<any> {
        return this.obj.PostCall(AppSettings.GetContactBookById, obj);
    }
    DeleteContactBookById(obj: any): Observable<any> {
        return this.obj.PostCall(AppSettings.DeleteContactBookById, obj);
    }
}