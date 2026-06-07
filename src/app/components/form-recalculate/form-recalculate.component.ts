import { Component, computed, input, output, signal, effect } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IInvoiceGet } from '../../interfaces/IInvoices';

type UserType = 'OPERADOR' | 'SUPERVISOR';

@Component({
  selector: 'app-form-recalculate',
  templateUrl: './form-recalculate.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
})
export class FormRecalculateComponent {
  invoice = input.required<IInvoiceGet>();
  onRecalculated = output<any>();
  userType = signal<UserType>('OPERADOR');
  newSubtotalInput = signal<number | null>(0);
  newDataInvoice = output<IInvoiceGet>();

  validationError = computed(() => {
    const inv = this.invoice();
    if (!inv) return 'Seleccione una factura primero.';

    const newVal = this.newSubtotalInput();
    if (newVal === null || newVal < 0) return 'Ingrese un subtotal válido.';

    const diff = newVal - inv.subtotal;

    if (diff > 0) {
      if (this.userType() === 'OPERADOR' && diff > 20000) {
        return `Operador (Tipo A) solo puede incrementar hasta $20,000. (Te pasaste por ${diff - 20000})`;
      }
      if (this.userType() === 'SUPERVISOR' && diff > 50000) {
        return `Supervisor (Tipo B) solo puede incrementar hasta $50,000. (Te pasaste por ${diff - 50000})`;
      }
    }
    return null;
  });

  recalculatedDetails = computed(() => {
    const inv = this.invoice();
    if (!inv) return [];

    const newVal = this.newSubtotalInput();
    const ratio = newVal !== null && newVal >= 0 && inv.subtotal > 0 ? newVal / inv.subtotal : 1;

    return inv.details.map((item) => {
      const newUnitPrice = item.unitPrice * ratio;
      const newTotalPrice = newUnitPrice * item.quantity;
      return {
        ...item,
        newUnitPrice,
        newTotalPrice,
        diff: newTotalPrice - item.totalPrice,
      };
    });
  });

  newTaxAmount = computed(() => {
    const newVal = this.newSubtotalInput();
    if (newVal === null || newVal < 0) return this.invoice()?.taxAmount || 0;

    const inv = this.invoice();
    if (inv && inv.subtotal > 0) {
      const taxRate = inv.taxAmount / inv.subtotal;
      return newVal * taxRate;
    }
    return newVal * 0.19;
  });

  newTotalAmount = computed(() => {
    const newVal = this.newSubtotalInput();
    if (newVal === null || newVal < 0) return this.invoice()?.totalAmount || 0;
    return newVal + this.newTaxAmount();
  });

  constructor() {
    effect(() => {
      const inv = this.invoice();
      if (inv) {
        this.newSubtotalInput.set(inv.subtotal);
      } else {
        this.newSubtotalInput.set(null);
      }
    });
  }

  protected saveRecalculate() {
    const invoiceToSave: IInvoiceGet = {
      id: this.invoice().id,
      details: this.recalculatedDetails(),
      subtotal: this.newSubtotalInput() ?? 0,
      taxAmount: this.newTaxAmount(),
      totalAmount: this.newTotalAmount(),
    };
    console.log('Factura recalculada guardada', {
      newSubtotal: this.newSubtotalInput(),
      newTax: this.newTaxAmount(),
      newTotal: this.newTotalAmount(),
      details: this.recalculatedDetails(),
    });
  }
}
