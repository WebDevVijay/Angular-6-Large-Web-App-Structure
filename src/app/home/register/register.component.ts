import { Component, OnInit, NgModule, ViewContainerRef, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators, FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { HandleErrors } from '../../_services/commonFunctions';
import { EmailValidator, PasswordValidator, matchValidator, } from '../../_services/validators.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  title = 'Angular 6 - Register';

  registerFormGroup: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  email_id: FormControl;
  password: FormControl;
  confirm_password: FormControl;

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
    if (this.registerFormGroup) {
      this.registerFormGroup.reset();
    }
  }
  createFormControls() {
    this.password = new FormControl('', [Validators.required, PasswordValidator.passwordFormat]);
    this.confirm_password = new FormControl('', [matchValidator('password'), Validators.required]);

    this.email_id = new FormControl('', [Validators.required, EmailValidator.mailFormat]);
    this.first_name = new FormControl('', [Validators.required]);
    this.last_name = new FormControl('', [Validators.required]);
  }
  createForm() {
    this.registerFormGroup = new FormGroup({
      first_name: this.first_name,
      last_name: this.last_name,
      email_id: this.email_id,
      password: this.password,
      confirm_password: this.confirm_password,
    });
  }
  Register() {
    debugger
    if (this.registerFormGroup.valid) {
      this.accountService.RegisterUser(this.registerFormGroup.value)
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
      this.registerFormGroup.controls['first_name'].markAsTouched();
      this.registerFormGroup.controls['last_name'].markAsTouched();
      this.registerFormGroup.controls['email_id'].markAsTouched();
      this.registerFormGroup.controls['password'].markAsTouched();
      this.registerFormGroup.controls['confirm_password'].markAsTouched();
    }
  }
}
