import { Component, input, model, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonToggelComponent } from '@components/ui/buttton-toggle/button-toggle.component';
import { IInvoice } from '../../interfaces/IInvoices';
import { ButtonComponent } from '@components/ui/buttton/button.component';

@Component({
  selector: 'app-card-invoice',
  templateUrl: './card-invoice.component.html',
  standalone: true,
  imports: [ButtonToggelComponent, CurrencyPipe, ButtonComponent, DatePipe],
})
export class CardInvoiceComponent {
  invoiceGet = input.required<IInvoice>();
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
