import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { ContactBookService } from '../../_services/contact-book.service';
import { ToastrService } from 'ngx-toastr';
import { HandleErrors } from '../../_services/commonFunctions';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.component.html'
})
export class ContactListComponent {
    title = 'Angular 6 - Contact List';
    contactBook: any = [];
    temp_contactBook: any = [];
    current_user_id: Number = 0;
    p: number = 1;
    filter_by: number = null;
    search_by: string = '';
    public popoverTitle: string = 'Confirm Delete?';
    public popoverMessage: string = 'Are you sure want to delete?';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    constructor(private storageService: StorageService, private route: ActivatedRoute, private router: Router,
        private toastrService: ToastrService,
        private contactBookService: ContactBookService,
        private handleErrors: HandleErrors,
        private titleService: Title
    ) {
        var UserDataKey = "UserData";
        let UserData: any = this.storageService.read(UserDataKey);
        if (UserData && UserData.user_id) {
            this.current_user_id = UserData.user_id;
        }
        this.titleService.setTitle(this.title);
        this.GetContactBookList();
    }
    Delete(contact_book_id) {
        var obj = {
            contact_book_id: contact_book_id,
            user_id: this.current_user_id
        }
        this.contactBookService.DeleteContactBookById(obj)
            .subscribe((data: any) => {
                this.toastrService.success(data.msg);
                if (data.IsSuccess) {
                    this.contactBook = data.data;
                    this.temp_contactBook = data.data;
                }
            }, error => {
                this.handleErrors.HandleError(<any>error, this.toastrService);
            });
    }
    GetContactBookList() {
        var user = {
            user_id: this.current_user_id
        }
        this.contactBookService.GetContactBookList(user)
            .subscribe((data: any) => {
                if (data.IsSuccess) {
                    this.contactBook = data.data;
                    this.temp_contactBook = data.data;
                }
            }, error => {
                this.handleErrors.HandleError(<any>error, this.toastrService);
            });
    }
    Edit(contact_book_id) {
        this.router.navigate(['/add-contact/' + contact_book_id]);
    }
    FilterBy(type) {
        this.filter_by = type;
        this.contactBook = this.temp_contactBook.filter(x => x.is_active == this.filter_by)
    }
    onSearchChange(value) {
        value = value.toLowerCase()
        var list = [];
        if (this.filter_by != null) {
            list = this.temp_contactBook.filter(x => x.is_active == this.filter_by);
        }
        else {
            list = this.temp_contactBook;
        }
        if (list && list.length) {
            this.contactBook = list.filter(function (x) {
                if (x.first_name.toLowerCase().includes(value)
                    || x.last_name.toLowerCase().includes(value)
                    || x.contact_no.toLowerCase().includes(value)
                    || x.email_id.toLowerCase().includes(value)
                ) {
                    return x;
                }
            })
        }
        else {
            this.contactBook = [];
        }
    }
    Clear() {
        this.p = 1;
        this.filter_by = null;
        this.search_by = '';
        this.contactBook = this.temp_contactBook;
    }
}
