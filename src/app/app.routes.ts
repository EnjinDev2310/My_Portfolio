import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Experience } from './pages/experience/experience';
import { Proyects } from './pages/proyects/proyects';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'proyects', component: Proyects },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
