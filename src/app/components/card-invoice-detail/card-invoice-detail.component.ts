import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IInvoiceDetailGet } from '../../interfaces/IInvoices';

@Component({
  selector: 'app-card-invoice-detail',
  templateUrl: './card-invoice-detail.component.html',
  standalone: true,
  imports: [CurrencyPipe]
})
export class CardInvoiceDetailComponent {
  detail = input.required<IInvoiceDetailGet>();
}
