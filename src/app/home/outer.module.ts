import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { LandingPageComponent } from './landing/landing.component'
import { AboutUsComponent } from './about-us/about-us.component'

import { UploadService } from '../_services/upload.service';
import { EmailValidator } from '../_services/validators.service';
import { OuterRoutingModule } from './outer.routing';
import { HeaderComponent } from './header/navbar.component'
@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        RegisterComponent,
        LandingPageComponent,
        AboutUsComponent
    ],
    imports: [
        OuterRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    bootstrap: [HomeComponent]
})
export class OuterModule { }
