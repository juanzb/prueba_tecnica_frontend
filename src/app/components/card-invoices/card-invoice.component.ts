import { Component, input, model } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ButtonToggelComponent } from '@components/ui/buttton/button-toggle.component';
import { IInvoiceGet } from '../../interfaces/IInvoices';

@Component({
  selector: 'app-card-invoice',
  templateUrl: './card-invoice.component.html',
  standalone: true,
  imports: [ButtonToggelComponent, CurrencyPipe],
})
export class CardInvoiceComponent {
  invoiceGet = input.required<IInvoiceGet>();
  isSelected = input<boolean>(false);
  isActive = model<boolean>(false);

  checkInvoiceActive(event: boolean) {
    console.log('event', event);
  }
}
