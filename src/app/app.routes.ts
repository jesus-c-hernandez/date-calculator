import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./components/main/main.routes').then((m) => m.mainRoutes),
  },
];
