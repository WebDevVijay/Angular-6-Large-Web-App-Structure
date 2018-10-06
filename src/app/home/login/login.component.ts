import { Component, OnInit, NgModule, ViewContainerRef, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators, FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { HandleErrors } from '../../_services/commonFunctions';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title = 'Angular 6 - Login';

  loginFormGroup: FormGroup;
  email_id: FormControl;
  password: FormControl;
  public errorMessage: String;
  constructor(private router: Router,
    private handleErrors: HandleErrors,
    private accountService: AccountService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  ResetForm() {
    if (this.loginFormGroup) {
      this.loginFormGroup.reset();
    }
  }
  createFormControls() {
    this.email_id = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }
  createForm() {
    this.loginFormGroup = new FormGroup({
      email_id: this.email_id,
      password: this.password
    });
  }
  ValidateLogin() {
    debugger
    if (this.loginFormGroup.valid) {
      this.accountService.ValidateLogin(this.loginFormGroup.value)
        .subscribe((Data: any) => {
          if (Data.IsSuccess) {
            this.toastrService.success(Data.msg);
            localStorage.clear();
            this.ResetForm();
            var UserDataKey = "UserData";
            this.storageService.write(UserDataKey, Data.data);
            this.router.navigate(['contact-book']);
          }
          else {
            this.toastrService.error(Data.msg);
          }
        },
          error => {
            this.handleErrors.HandleError(<any>error, this.toastrService);
          });
    }
    else {
      this.loginFormGroup.controls['email_id'].markAsTouched();
      this.loginFormGroup.controls['password'].markAsTouched();
    }
  }
}
