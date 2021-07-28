import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from 'src/layouts/main-layout/main-layout.module';
import { UmService } from 'src/services/um.service';
import { HomeService } from 'src/services/home.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserStateInterceptor } from 'src/interceptors/browser-state.interceptor';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { UsersModule } from './users/users.module';
import { AboutLayoutModule } from 'src/layouts/about-layout/about-layout.module';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, map } from 'rxjs/operators';
@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,

    MainLayoutModule,
    AboutLayoutModule,
    UsersModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    HomeService,
    UmService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
