import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { ContactBookService } from '../../_services/contact-book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidator } from '../../_services/validators.service';
import { HandleErrors } from '../../_services/commonFunctions';
import { ContactBookModel } from '../../_modals/contact-book';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'add-contact-book.',
    templateUrl: 'add-contact-book.component.html'
})
export class AddContactComponent implements OnInit {
    title = 'Add New Contact';
    addContactFormGroup: FormGroup;
    current_user_id: Number = 0;
    current_contact_book_id: Number = 0;
    first_name: FormControl;
    last_name: FormControl;
    email_id: FormControl;
    is_active: FormControl;
    contact_no: FormControl;
    newBook: any;

    constructor(private storageService: StorageService,
        private router: Router,
        private toastrService: ToastrService,
        private handleErrors: HandleErrors,
        private contactBookService: ContactBookService,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        var that = this;
        this.route.params.subscribe(function (params) {
            if (params && params.id) {
                that.title = 'Update Contact';
                that.current_contact_book_id = Number(params.id);
                that.GetDataForEdit();
            }
            else {
                this.current_contact_book_id = 0;
            }
        });

        this.titleService.setTitle('Angular 6 - Add New Contact');
    }
    ngOnInit() {
        var UserDataKey = "UserData";
        let UserData: any = this.storageService.read(UserDataKey);
        if (UserData && UserData.user_id) {
            this.current_user_id = UserData.user_id;
        }
        this.createFormControls();
        this.createForm();
    }
    BindData(data) {
        this.addContactFormGroup.controls['email_id'].setValue(data.email_id);
        this.addContactFormGroup.controls['first_name'].setValue(data.first_name);
        this.addContactFormGroup.controls['last_name'].setValue(data.last_name);
        this.addContactFormGroup.controls['contact_no'].setValue(data.contact_no);
        this.addContactFormGroup.controls['is_active'].setValue(data.is_active);
    }
    GetDataForEdit() {
        var obj = {
            contact_book_id: this.current_contact_book_id
        }
        this.contactBookService.GetContactBookById(obj)
            .subscribe((data: any) => {
                if (data.IsSuccess) {
                    this.BindData(data.data);
                }
            }, error => {
                this.handleErrors.HandleError(<any>error, this.toastrService);
            });
    }
    ResetForm() {
        if (this.addContactFormGroup) {
            this.addContactFormGroup.reset();
        }
    }
    createFormControls() {
        this.is_active = new FormControl(true);
        this.contact_no = new FormControl('', [Validators.required]);
        this.email_id = new FormControl('', [Validators.required, EmailValidator.mailFormat]);
        this.first_name = new FormControl('', [Validators.required]);
        this.last_name = new FormControl('', [Validators.required]);
    }
    createForm() {
        this.addContactFormGroup = new FormGroup({
            first_name: this.first_name,
            last_name: this.last_name,
            is_active: this.is_active,
            email_id: this.email_id,
            contact_no: this.contact_no
        });
    }
    Save() {
        debugger
        if (this.addContactFormGroup.valid) {
            this.newBook = new ContactBookModel(this.addContactFormGroup.value);
            this.newBook.contact_book_id = this.current_contact_book_id;
            this.newBook.user_id = this.current_user_id;
            this.contactBookService.AddContactBook(this.newBook)
                .subscribe((Data: any) => {
                    if (Data.IsSuccess) {
                        this.toastrService.success(Data.msg);
                        this.ResetForm();
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
            this.addContactFormGroup.controls['first_name'].markAsTouched();
            this.addContactFormGroup.controls['last_name'].markAsTouched();
            this.addContactFormGroup.controls['email_id'].markAsTouched();
            this.addContactFormGroup.controls['contact_no'].markAsTouched();
        }
    }
    Cancel() {
        this.router.navigate(['contact-book']);
    }
}
