import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { SeoService } from './services/seo-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('seo-angular-site');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const seoData = data['seo'];
      if (seoData) {
        // Update page meta
        this.seo.updatePage({
          title: seoData.title,
          description: seoData.description || null,
          keywords: seoData.keywords || null,
          ogTitle: seoData.ogTitle || null,
        });
      } else if (data['spa']) {
        // SPA-only pages: reset to base tags
        this.seo.resetToBase();
      }
    });
  }
}
