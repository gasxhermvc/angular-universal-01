import {
  isPlatformBrowser,
  LocationStrategy,
  ViewportScroller,
} from '@angular/common';
import { Component, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Scroll,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularUniversal';
  data: any;
  loading: boolean = false;
  isPopState = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private ngZone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).app = this;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const w: any = window as any;

      const scrollLevels: any = {};
      let lastId = 1;
      let restoredId: any;

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          scrollLevels[lastId] = [w.scrollX, w.scrollY];
          lastId = event.id;
          restoredId = event.restoredState
            ? +event.restoredState.navigationId
            : undefined;
        }

        if (event instanceof NavigationEnd) {
          this.ngZone.runOutsideAngular(
            () =>
              new Promise((resolve: any, reject: any) => {
                setTimeout(() => {
                  if (restoredId) {
                    w.scrollTo(
                      ...(scrollLevels[restoredId]
                        ? scrollLevels[restoredId]
                        : [0, 0])
                    );
                  } else {
                    w.scrollTo(0, 0);
                  }
                  resolve();
                }, 0);
              })
          );
        }
      });
    }
  }
}
