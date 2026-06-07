import { Component, effect, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../interfaces/IProducts';

@Component({
  selector: 'app-card-product',
  templateUrl: './cardProduct.html',
  standalone: true,
  imports: [CurrencyPipe]
})
export class CardProductComponent {
  productGet = input.required<IProduct>();
}
