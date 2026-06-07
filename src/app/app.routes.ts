import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: 'invoices',
        loadComponent: () =>
          import('@view/Invoices/Invoice.component').then((c) => c.InvoiceComponent),
      },
      {
        path: 'recalculate',
        loadComponent: () =>
          import('@view/Recalculate/recalculate.component').then((c) => c.RecalculateComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'app/home',
    pathMatch: 'full',
  },
];
