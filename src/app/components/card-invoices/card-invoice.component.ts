import { Component, input, model, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ButtonToggelComponent } from '@components/ui/buttton-toggle/button-toggle.component';
import { IInvoiceGet } from '../../interfaces/IInvoices';
import { ButtonComponent } from '@components/ui/buttton/button.component';

@Component({
  selector: 'app-card-invoice',
  templateUrl: './card-invoice.component.html',
  standalone: true,
  imports: [ButtonToggelComponent, CurrencyPipe, ButtonComponent],
})
export class CardInvoiceComponent {
  invoiceGet = input.required<IInvoiceGet>();
  isSelected = input<boolean>(false);
  isActive = model<boolean>(false);
  invoiceActive = output<number>();
  deleteInvoiceEvent = output<number>();

  checkInvoiceActive(event: number) {
    this.invoiceActive.emit(event);
  }

  deleteInvoice(event: number) {
    this.deleteInvoiceEvent.emit(event);
  }
}
