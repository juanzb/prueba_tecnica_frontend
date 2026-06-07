import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface InavItem {
  icon?: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  navItemsList: InavItem[] = [
    { label: 'Facturas', path: '/app/invoices' },
    { label: 'Recalcular', path: '/app/recalculate' },
  ];
}
