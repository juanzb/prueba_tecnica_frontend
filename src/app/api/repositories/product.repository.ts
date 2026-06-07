import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { IProduct } from '../../interfaces/IProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsRepository extends BaseApiService {
  getProducts(endpoint = 'products'): Promise<IProduct[]> {
    return this.get<IProduct[]>(endpoint);
  }
}
