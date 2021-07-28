import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutLayoutComponent } from 'src/layouts/about-layout/about-layout.component';
import { MainLayoutComponent } from 'src/layouts/main-layout/main-layout.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   loadChildren: './home/home.module#HomeModule',
  // },
  {
    path: 'about',
    component: AboutLayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      },
    ],
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      // scrollPositionRestoration: 'top',
      // onSameUrlNavigation: 'ignore',
      // relativeLinkResolution: 'legacy',
      // anchorScrolling: 'enabled',
      // scrollPositionRestoration: 'enabled',
      // scrollOffset: [0, 0],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
