export interface IInvoice {
  date: string;
  client: string;
  id?: number;
  description?: string;
  subtotal: number;
  total: number;
  details: IDetailInvoice[];
}

export interface IDetailInvoice {
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface IInvoiceGet {
  id: number;
  details: IInvoiceDetailGet[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
}

export interface IInvoiceDetailGet {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}
