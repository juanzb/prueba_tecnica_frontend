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
}
