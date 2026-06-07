import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { IInvoice, IInvoiceGet } from '../../interfaces/IInvoices';

@Injectable({
  providedIn: 'root',
})
export class InvoiceRepository extends BaseApiService {
  getInvoices(endpoint = 'invoices'): Promise<IInvoiceGet[]> {
    return this.get<IInvoiceGet[]>(endpoint);
  }

  deleteInvoices(endpoint = 'invoices'): Promise<IInvoiceGet[]> {
    return this.delete<IInvoiceGet[]>(endpoint);
  }

  createInvoice(invoice: IInvoice, endpoint = 'invoices'): Promise<IInvoice> {
    return this.post<IInvoice>(endpoint, invoice);
  }

  updateInvoice(invoice: IInvoice, endpoint = 'invoices'): Promise<IInvoice> {
    return this.put<IInvoice>(endpoint, invoice);
  }
}
