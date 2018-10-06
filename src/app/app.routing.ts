import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home', loadChildren: './home/outer.module#OuterModule' },
            { path: '', loadChildren: './afterlogin/inner.module#InnerModule' },
            // otherwise redirect to home
            { path: '**', redirectTo: 'home/welcome' }
        ], { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
