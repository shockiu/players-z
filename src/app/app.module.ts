import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav-menu/navbar.component';
import { TemplateComponent } from './pages/template-form/template.component';
import { ReactiveComponent } from './pages/reactive-form/reactive.component';
import { HomeComponent } from './pages/home/home.component';
import { DataExample } from './api.data';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TemplateComponent,
    ReactiveComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataExample),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
