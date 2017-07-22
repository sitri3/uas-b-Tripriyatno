import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { FormComponent } from './book/form.component';
import {BookService} from "./book/book.service";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'', redirectTo: '/book', pathMatch: 'full'},
      {path:'book', component:BookComponent},
      {path: 'form/:act', component: FormComponent},
      {path: 'form/:act/:id', component: FormComponent}
    ])
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
