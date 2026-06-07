export interface IInvoice {
  id: number;
  client: string;
  description?: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  details: IInvoiceDetail[];
  createdAt: Date;
  updatedAt: Date;
}

export type TUserType = 'OPERATOR' | 'SUPERVISOR';

export interface IRecalculatedInvoice {
  newSubtotal: number;
  userRole: TUserType;
}

export interface IInvoiceDetail {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

export interface IUpdateInvoiceDetail {
  productName?: string;
  quantity?: number;
  totalPrice?: number;
  unitPrice?: number;
}

export interface ICreateInvoice {
  client: string;
  description?: string;
  details: ICreateDetailInvoice[];
}

export interface ICreateDetailInvoice {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface IUpdateInvoice {
  client?: string;
  description?: string;
  details?: ICreateDetailInvoice[];
}
