import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import {
  ICreateInvoice,
  IInvoice,
  IRecalculatedInvoice,
  IUpdateInvoice,
} from '../../interfaces/IInvoices';

@Injectable({
  providedIn: 'root',
})
export class InvoiceRepository extends BaseApiService {
  getInvoices(endpoint = 'invoices'): Promise<IInvoice[]> {
    return this.get<IInvoice[]>(endpoint);
  }

  deleteInvoices(endpoint = 'invoices'): Promise<IInvoice[]> {
    return this.delete<IInvoice[]>(endpoint);
  }

  createInvoice(invoice: ICreateInvoice, endpoint = 'invoices'): Promise<IInvoice> {
    return this.post<IInvoice>(endpoint, invoice);
  }

  saveRecalculateInvoice(invoice: IRecalculatedInvoice, endpoint = 'invoices'): Promise<IInvoice> {
    return this.put<IInvoice>(endpoint, invoice);
  }
}
