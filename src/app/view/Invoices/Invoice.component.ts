import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/IProducts';
import { IInvoice, IInvoiceGet } from '../../interfaces/IInvoices';
import { ProductsRepository } from '../../api/repositories/product.repository';
import { InvoiceRepository } from '../../api/repositories/invoice.repository';
import { CardProductComponent } from '@components/card-product/cardProduct';
import { ButtonToggelComponent } from '@components/ui/buttton/button-toggle.component';
import { CardInvoiceComponent } from '@components/card-invoices/card-invoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  standalone: true,
  imports: [CardInvoiceComponent],
})
export class InvoiceComponent implements OnInit {
  protected dataProducts = signal<IProduct[]>([]);
  protected dataInvoices = signal<IInvoiceGet[]>([]);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);
  productRepository = inject(ProductsRepository);
  invoiceRepository = inject(InvoiceRepository);

  ngOnInit() {
    this.findDataProducts();
    this.findDataInvoices();
  }

  findDataProducts() {
    this.productRepository.getProducts().then((data) => {
      console.log(data);
      this.dataProducts.set(data);
    });
  }

  findDataInvoices() {
    this.invoiceRepository.getInvoices().then((data) => {
      console.log(data);
      this.dataInvoices.set(data);
    });
  }

  createInvoice() {
    this.invoiceRepository.getInvoices().then((data) => {
      console.log(data);
      this.dataInvoices.set(data);
    });
  }
}
