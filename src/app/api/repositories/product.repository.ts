import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { IProduct } from '../../interfaces/IProducts';
import { IApiResponse } from '../../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsRepository extends BaseApiService {
  getProducts(endpoint = 'products'): Promise<IApiResponse<IProduct[]>> {
    return this.get<IApiResponse<IProduct[]>>(endpoint);
  }
}
