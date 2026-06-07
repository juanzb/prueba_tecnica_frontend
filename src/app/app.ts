import { Component } from '@angular/core';
import { InvoiceComponent } from '@view/Invoices/Invoice.component';

@Component({
  selector: 'app-root',
  imports: [InvoiceComponent],
  templateUrl: './app.html',
})
export class App {}
