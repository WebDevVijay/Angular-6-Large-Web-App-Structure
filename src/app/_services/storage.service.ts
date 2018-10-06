import { Injectable } from '@angular/core';
@Injectable()
export class StorageService {
    write(key: string, value: any) {
        key = btoa(key);
        value = JSON.stringify(value);
        value = btoa(value);
        localStorage.setItem(key, value);
    }
    read<T>(key: string): T {
        key = btoa(key)
        let value: any = localStorage.getItem(key);
        if (value && value != undefined && value != null && value != "") {
            value = atob(value);
            return <T>JSON.parse(value);
        }
        return null;
    }
}