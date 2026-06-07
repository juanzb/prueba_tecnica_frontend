import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/IProducts';
import { IInvoice, IDetailInvoice } from '../../interfaces/IInvoices';

@Component({
  selector: 'app-form-invoice',
  templateUrl: './formInvoice.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
})
export class FromInvoiceComponent {
  products = input.required<IProduct[]>();
  onSave = output<IInvoice>();
  clientName = signal<string>('');
  description = signal<string>('');
  cart = signal<(IProduct & { quantity: number })[]>([]);

  subtotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  });

  total = computed(() => {
    return this.subtotal() * 1.19;
  });

  addToCart(product: IProduct) {
    const currentCart = this.cart();
    const existing = currentCart.find((p) => p.id === product.id);
    if (existing) {
      this.cart.update((c) =>
        c.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)),
      );
    } else {
      this.cart.update((c) => [...c, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    this.cart.update((c) => c.filter((p) => p.id !== productId));
  }

  updateQuantity(productId: number, change: number) {
    this.cart.update((c) =>
      c.map((p) => {
        if (p.id === productId) {
          const newQty = p.quantity + change;
          return { ...p, quantity: newQty > 0 ? newQty : 1 };
        }
        return p;
      }),
    );
  }

  submit() {
    if (!this.clientName() || this.cart().length === 0) return;

    const details: IDetailInvoice[] = this.cart().map((item) => ({
      productName: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    }));

    const newInvoice: IInvoice = {
      client: this.clientName(),
      date: new Date().toISOString(),
      description: this.description(),
      subtotal: this.subtotal(),
      total: this.total(),
      details,
    };

    this.onSave.emit(newInvoice);

    this.clientName.set('');
    this.description.set('');
    this.cart.set([]);
  }
}
