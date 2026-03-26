import { Routes } from '@angular/router';

export const routes: Routes = [
  // SSR-enabled pages
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    data: { seo: { title: 'Home - My Angular SSR Site', description: 'Home page description' } }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: { seo: { title: 'About - My Angular SSR Site', description: 'About us description', keywords: 'about, company' } }
  },

  // SPA pages
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    data: { spa: true, seo: { title: 'Dashboard - SPA Page' } }
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    data: { spa: true, seo: { title: 'Profile - SPA Page' } }
  },

  { path: '**', redirectTo: '' },
];