import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutLayoutComponent } from './about-layout.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AboutLayoutComponent],
  exports: [AboutLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class AboutLayoutModule {}
