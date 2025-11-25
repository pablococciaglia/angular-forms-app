import { Component, Type } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { Resolve, ResolveFn, RouterLink, RouterLinkActive } from '@angular/router';

interface SideMenuItem {
  title: string | Type<Resolve<string>> | ResolveFn<string> | undefined;
  route: string;
}
const reactiveItems = reactiveRoutes[0].children || [];
@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenuItems: SideMenuItem[] = reactiveItems
    .filter((route) => route.path !== '**')
    .map((route) => ({
      title: route.title || 'No Title',
      route: `/reactive/${route.path}`,
    }));

  authMenu: SideMenuItem[] = [
    {
      title: 'Register',
      route: '/auth',
    },
  ];

  countryMenu: SideMenuItem[] = [
    {
      title: 'Countries',
      route: '/country',
    },
  ];
}
