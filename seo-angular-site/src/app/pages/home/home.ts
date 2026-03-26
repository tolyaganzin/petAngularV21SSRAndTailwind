import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public readonly seo = inject(SeoService);

  public ngOnInit() {
    this.seo.updatePage({
      title: 'Home Page 234',
      description: 'This is the home page for SEO.',
    });
  }
}
