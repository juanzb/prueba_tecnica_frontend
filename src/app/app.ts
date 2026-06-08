import { Component } from '@angular/core';
import { InvoiceComponent } from '@view/Invoices/Invoice.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [InvoiceComponent, NgxSonnerToaster],
})
export class App {}
