import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ApiInterceptor } from './api-interceptor'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftmenuComponent }   from './leftmenu/leftmenu.component';
import { PostdetailComponent }   from './post-detail/postdetail.component';
import { AddpostComponent }   from './add-post/addpost.component';

import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeftmenuComponent,
    PostdetailComponent,
    AddpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
