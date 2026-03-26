import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  public readonly seo = inject(SeoService);

  public ngOnInit() {
    this.seo.updatePage({
      title: 'About - My Angular SSR Site',
      description: 'Learn more about our company',
      keywords: 'about, company, information',
      ogTitle: 'About Us - My Angular SSR Site',
    });
  }
}
