import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import {
  ICreateInvoice,
  IInvoice,
  IRecalculatedInvoice,
  IUpdateInvoice,
} from '../../interfaces/IInvoices';
import { IApiResponse } from '../../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class InvoiceRepository extends BaseApiService {
  getInvoices(endpoint = 'invoices'): Promise<IApiResponse<IInvoice[]>> {
    return this.get<IApiResponse<IInvoice[]>>(endpoint);
  }

  deleteInvoices(endpoint = 'invoices'): Promise<IApiResponse<IInvoice>> {
    return this.delete<IApiResponse<IInvoice>>(endpoint);
  }

  createInvoice(invoice: ICreateInvoice, endpoint = 'invoices'): Promise<IApiResponse<IInvoice>> {
    return this.post<IApiResponse<IInvoice>>(endpoint, invoice);
  }

  saveRecalculateInvoice(
    invoice: IRecalculatedInvoice,
    endpoint = 'invoices',
  ): Promise<IApiResponse<IInvoice>> {
    return this.put<IApiResponse<IInvoice>>(endpoint, invoice);
  }
}
