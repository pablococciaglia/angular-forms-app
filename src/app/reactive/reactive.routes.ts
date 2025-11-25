import { Routes } from '@angular/router';
import SwitchesPage from './pages/switches/switches';
import BasicPage from './pages/basic/basic';
import DyncamicPage from './pages/dyncamic/dyncamic';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basic Reactive Form',
        component: BasicPage,
      },
      {
        path: 'dynamic',
        title: 'Dynamic Reactive Form',
        component: DyncamicPage,
      },
      {
        path: 'switches',
        title: 'Switches Reactive Form',
        component: SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
