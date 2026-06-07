import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/IProducts';
import { IInvoice, IInvoiceGet } from '../../interfaces/IInvoices';
import { ProductsRepository } from '../../api/repositories/product.repository';
import { InvoiceRepository } from '../../api/repositories/invoice.repository';
import { CardInvoiceComponent } from '@components/card-invoices/card-invoice.component';
import { CardInvoiceDetailComponent } from '@components/card-invoice-detail/card-invoice-detail.component';
import { CurrencyPipe } from '@angular/common';
import { ModalConfirmComponent } from '@components/ui/modal-confirm/modal-confirm.component';
import { FromInvoiceComponent } from '@components/form-invoice/formInvoice';
import { FormRecalculateComponent } from '@components/form-recalculate/form-recalculate.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  standalone: true,
  imports: [
    CardInvoiceComponent,
    CardInvoiceDetailComponent,
    CurrencyPipe,
    ModalConfirmComponent,
    FromInvoiceComponent,
    FormRecalculateComponent,
  ],
})
export class InvoiceComponent implements OnInit {
  protected dataProducts = signal<IProduct[]>([]);
  protected dataInvoices = signal<IInvoiceGet[]>([] as IInvoiceGet[]);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);
  idInvoiceToShow = signal<number>(0);
  openModalToDeleteInvoice = signal<boolean>(false);
  idInvoiceToDelete = signal<number>(0);
  isRecalculate = signal<boolean>(false);

  productRepository = inject(ProductsRepository);
  invoiceRepository = inject(InvoiceRepository);

  ngOnInit() {
    this.findDataProducts();
    this.findDataInvoices();
  }

  findDataProducts() {
    this.productRepository
      .getProducts()
      .then((data) => {
        this.dataProducts.set(data);
      })
      .catch((error) => {
        this.isError.set(true);
      });
  }

  findDataInvoices() {
    this.invoiceRepository
      .getInvoices()
      .then((data) => {
        this.dataInvoices.set(data);
      })
      .catch((error) => {
        this.isError.set(true);
      });
  }

  createInvoice(invoice: IInvoice) {
    this.invoiceRepository
      .createInvoice(invoice)
      .then(() => {
        this.findDataInvoices();
      })
      .catch((error) => {
        this.isError.set(true);
      });
  }

  updateInvoice(invoice: IInvoice) {
    this.invoiceRepository
      .updateInvoice(invoice)
      .then(() => {
        this.findDataInvoices();
      })
      .catch((error) => {
        this.isError.set(true);
      });
  }

  checkInvoiceActive(event: number) {
    this.idInvoiceToShow.update((prev) => {
      if (prev === event) return -1;
      return event;
    });
  }

  selectInvoiceToDelete(event: number) {
    this.idInvoiceToDelete.set(event);
    this.openModalToDeleteInvoice.set(true);
  }

  closeModalConfirmDeleteInvoice() {
    this.openModalToDeleteInvoice.set(false);
  }

  deleteInvoice() {
    this.invoiceRepository.deleteInvoices(`invoices/${this.idInvoiceToDelete()}`).then(() => {
      this.findDataInvoices();
    });
    this.openModalToDeleteInvoice.set(false);
  }
}
