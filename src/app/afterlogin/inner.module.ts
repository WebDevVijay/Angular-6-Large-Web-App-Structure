import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexInnerComponent } from './index.component'
import { InnerRoutingModule } from './inner.routing';
import { AuthGuard } from '../_guards/auth.guard';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact-book/add-contact-book.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { ContactBookService } from '../_services/contact-book.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
@NgModule({
    declarations: [
        HeaderComponent,
        IndexInnerComponent,
        ContactListComponent,
        AddContactComponent
    ],
    imports: [
        CommonModule,
        InnerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'primary' 
        }),
        NgxPaginationModule
    ],
    providers: [AuthGuard, ContactBookService],
    bootstrap: [IndexInnerComponent]
})
export class InnerModule { }
