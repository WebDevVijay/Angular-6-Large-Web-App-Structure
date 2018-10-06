import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class HandleErrors {
    constructor(
        private route: ActivatedRoute,
        private router: Router, private storageService: StorageService) {
    }
    HandleError(error: any, toastr: any): void {
        var Message = "";
        if (error.error != undefined && error.error.Message != undefined && error.error.Message != null && error.error.Message != "") {
            Message = error.error.Message
        }
        else if (error != null && error.response != undefined && error.response != null && error.response != '') {
            var errordata = JSON.parse(error.response);
            Message = errordata.Message
        }
        else {
            Message = "Error Occured, Please try again"
        }
        if (error.status == 400 || error.status == 500) { // BadRequest OR Internal Server Error
            toastr.error(Message);
        }
        else if (error.status == 405) {
            var UserDataKey = "UserData";
            let UserData: any = this.storageService.read(UserDataKey);
        }

        else if (error.status == 800 || error.status == 401) { // Token Expired Or Unauthorized
            toastr.error('Session Expired');
        }
        else if (error.status == 0 && !navigator.onLine) {
            toastr.error('No Internet Connectivity');
        }
        else {
            toastr.error(Message);
        }
    }
}
