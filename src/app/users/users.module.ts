import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [CommonModule, HttpClientModule, UsersRoutingModule],
  // providers: [UmService],
})
export class UsersModule {}
