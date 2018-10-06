import { NgModule } from '@angular/core';
import { ServiceCall } from './_services/servicecall.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './_services/account.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HandleErrors } from './_services/commonFunctions';
import { StorageService } from './_services/storage.service';
import { AppRoutingModule } from './app.routing'
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule, Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [Title,AccountService, ServiceCall, StorageService, HandleErrors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
