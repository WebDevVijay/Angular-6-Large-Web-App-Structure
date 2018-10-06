import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from '../_guards/auth.guard';
import { LandingPageComponent } from './landing/landing.component'
import { AboutUsComponent } from './about-us/about-us.component'
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: HomeComponent,
                children: [
                    { path: 'welcome', component: LandingPageComponent },
                    { path: 'login', component: LoginComponent },
                    { path: 'register', component: RegisterComponent },
                    { path: 'about-us', component: AboutUsComponent }
                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class OuterRoutingModule { }