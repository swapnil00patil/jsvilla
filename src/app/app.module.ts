import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api-interceptor'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftmenuComponent }   from './leftmenu/leftmenu.component';
import { PostdetailComponent }   from './post-detail/postdetail.component';

import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeftmenuComponent,
    PostdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
