import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscribers: any = {};

  constructor(private router: Router) {
  
  }

  ngAfterViewInit() {
    this.subscribers.analytics = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && typeof ga != 'undefined') {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    })
  }

  ngOnDestroy() {
    this.subscribers.analytics.unsubscribe();
  }
}
