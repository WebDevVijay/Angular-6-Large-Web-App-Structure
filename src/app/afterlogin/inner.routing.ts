import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexInnerComponent } from './index.component';
import { AuthGuard } from '../_guards/auth.guard';
import { ContactListComponent } from './contact-list/contact-list.component'
import { AddContactComponent } from './add-contact-book/add-contact-book.component'
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: IndexInnerComponent, canActivate: [AuthGuard],
                children: [
                    { path: 'contact-book', component: ContactListComponent, canActivate: [AuthGuard] },
                    { path: 'add-contact', component: AddContactComponent, canActivate: [AuthGuard] },
                    { path: 'add-contact/:id', component: AddContactComponent, canActivate: [AuthGuard] },
                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class InnerRoutingModule { }