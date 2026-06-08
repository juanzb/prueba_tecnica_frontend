import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/IProducts';
import { ICreateInvoice, IInvoice, IRecalculatedInvoice } from '../../interfaces/IInvoices';
import { ProductsRepository } from '../../api/repositories/product.repository';
import { InvoiceRepository } from '../../api/repositories/invoice.repository';
import { CardInvoiceComponent } from '@components/card-invoices/card-invoice.component';
import { CardInvoiceDetailComponent } from '@components/card-invoice-detail/card-invoice-detail.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ModalConfirmComponent } from '@components/ui/modal-confirm/modal-confirm.component';
import { FromInvoiceComponent } from '@components/form-invoice/formInvoice';
import { FormRecalculateComponent } from '@components/form-recalculate/form-recalculate.component';
import { toast } from 'ngx-sonner';

type InvoiceUpdateAction =
  | { type: 'add'; payload: IInvoice }
  | { type: 'recalculate'; payload: IInvoice }
  | { type: 'delete'; payload: number };

type TValidateError = { feature: TFeatures; message?: string; error: any };

type TFeatures = 'Productos' | 'Facturas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  standalone: true,
  imports: [
    CardInvoiceComponent,
    CardInvoiceDetailComponent,
    CurrencyPipe,
    DatePipe,
    ModalConfirmComponent,
    FromInvoiceComponent,
    FormRecalculateComponent,
  ],
})
export class InvoiceComponent implements OnInit {
  protected dataProducts = signal<IProduct[]>([]);
  protected dataInvoices = signal<IInvoice[]>([] as IInvoice[]);
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
      .then((res) => {
        toast.success('Productos', {
          description: 'Productos cargados correctamente',
        });
        this.dataProducts.set(res.data);
      })
      .catch((error) => {
        this.validateErrorResponse({
          feature: 'Productos',
          message: 'Error al cargar los productos',
          error,
        });
      });
  }

  findDataInvoices() {
    this.invoiceRepository
      .getInvoices()
      .then((res) => {
        this.dataInvoices.set(res.data);
        toast.success('Facturas', {
          description: res.message,
        });
      })
      .catch((error) => {
        this.validateErrorResponse({
          feature: 'Facturas',
          message: 'Error al cargar las facturas',
          error,
        });
      });
  }

  createInvoice(invoice: ICreateInvoice) {
    this.invoiceRepository
      .createInvoice(invoice)
      .then((res) => {
        this.refreshInvoices({ type: 'add', payload: res.data });
        toast.success('Facturas', {
          description: res.message,
        });
      })
      .catch((error) => {
        this.validateErrorResponse({
          feature: 'Facturas',
          message: 'Error al crear la factura',
          error,
        });
      });
  }

  deleteInvoice() {
    this.invoiceRepository
      .deleteInvoices(`invoices/${this.idInvoiceToDelete()}`)
      .then((res) => {
        this.refreshInvoices({ type: 'delete', payload: res.data.id });
        toast.success('Facturas', {
          description: res.message,
        });
      })
      .catch((error) => {
        this.validateErrorResponse({
          feature: 'Facturas',
          message: 'Error al eliminar la factura',
          error,
        });
      });
    this.openModalToDeleteInvoice.set(false);
  }

  onRecalculate(event: IRecalculatedInvoice) {
    this.invoiceRepository
      .saveRecalculateInvoice(event, `invoices/${this.idInvoiceToShow()}/recalculate-save`)
      .then((res) => {
        this.refreshInvoices({ type: 'recalculate', payload: res.data });
        toast.success('Recalculo', {
          description: res.message,
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error('Recalculo', {
          description: error.message || 'Error al recalcular, Por favor intente de nuevo',
        });
      });
  }

  refreshInvoices(action: InvoiceUpdateAction) {
    switch (action.type) {
      case 'recalculate':
        this.dataInvoices.update((prev) =>
          prev.map((item) => (item.id === action.payload.id ? action.payload : item)),
        );
        break;

      case 'add':
        this.dataInvoices.update((prev) => [...prev, action.payload]);
        break;

      case 'delete':
        this.dataInvoices.update((prev) => prev.filter((e) => e.id !== action.payload));
        break;
    }
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

  private validateErrorResponse({ feature, message, error }: TValidateError): void {
    // console.log(error);
    let errorToShow;
    if (error.status === 0 || error.message.includes('Unknown Error')) {
      errorToShow = 'Error de conexión, por favor recargar la página';
    } else {
      errorToShow = message || error.message;
    }

    toast.error(feature, {
      description: errorToShow,
    });
  }
}
