import { Injectable, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoOptions {
  title: string;
  description?: string | null; // null = remove tag
  keywords?: string | null;
  ogTitle?: string | null;
  // you can extend with og:description, twitter:card, etc.
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public titleSignal = signal('My Angular SSR Site');

  // List of meta tags we manage
  private managedTags = [
    { attr: 'name', value: 'description' },
    { attr: 'name', value: 'keywords' },
    { attr: 'property', value: 'og:title' },
  ];

  constructor(private title: Title, private meta: Meta) {}

  /**
   * Update page SEO.
   * If description/keywords/ogTitle are null, remove the tag.
   */
  updatePage(options: SeoOptions) {
    // 1️⃣ Update the title
    this.title.setTitle(options.title);
    this.titleSignal.set(options.title);

    // 2️⃣ Update / remove meta tags
    this.updateOrRemoveMeta('name', 'description', options.description);
    this.updateOrRemoveMeta('name', 'keywords', options.keywords);
    this.updateOrRemoveMeta('property', 'og:title', options.ogTitle);
  }

  /**
   * Update a single meta tag or remove it if null/empty.
   */
  private updateOrRemoveMeta(attr: 'name' | 'property', value: string, content?: string | null) {
    const tag = this.meta.getTag(`${attr}="${value}"`);
    if (!content) {
      // Remove tag if it exists
      if (tag) this.meta.removeTagElement(tag);
      return;
    }

    if (tag) {
      this.meta.updateTag({ [attr]: value, content });
    } else {
      this.meta.addTag({ [attr]: value, content });
    }
  }

  /**
   * Reset to "base tags" only
   * Useful for SPA pages where you don't want page-specific meta
   */
  resetToBase(base: Partial<SeoOptions> = { title: 'My Angular SSR Site' }) {
    this.updatePage({
      title: base.title || 'My Angular SSR Site',
      description: base.description || null,
      keywords: base.keywords || null,
      ogTitle: base.ogTitle || null,
    });
  }
}