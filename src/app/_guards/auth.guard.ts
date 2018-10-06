import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../_services/storage.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private storageService: StorageService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var UserDataKey = "UserData";
        let UserData: any = this.storageService.read(UserDataKey);
        if (UserData && UserData.user_id) {
            return true;
        }
        else {  // not logged in so redirect to landing page with the return url
            localStorage.clear();
            this.router.navigate(['home/welcome']);
            return false;
        }
    }
}