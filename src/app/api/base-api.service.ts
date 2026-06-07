import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment as env } from '../../environments/environment';

export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private http = inject(HttpClient);

  private getFullUrl(endpoint: string): string {
    return `${env.apiUrl}/${endpoint}`;
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    options: { body?: unknown; params?: Record<string, string> } = {},
  ): Promise<T> {
    const url = this.getFullUrl(endpoint);
    let params = new HttpParams();

    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        params = params.set(key, options.params![key]);
      });
    }

    try {
      const response$ = this.http.request<StandardResponse<T> | T>(method, url, {
        body: options.body,
        params,
        headers: {
          Accept: 'application/json',
        },
      });

      const response = await firstValueFrom(response$);

      // If it follows the StandardResponse pattern, extract the data
      if (
        response &&
        typeof response === 'object' &&
        'data' in response &&
        'statusCode' in response
      ) {
        return (response as StandardResponse<T>).data;
      }

      return response as T;
    } catch (error) {
      // Re-throw the error message if it's an HttpErrorResponse with a body message
      if (error && typeof error === 'object' && 'error' in error) {
        const errorBody = (error as { error: unknown }).error;
        if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
          throw new Error((errorBody as { message: string }).message);
        }
      }
      throw error;
    }
  }

  protected async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', endpoint, { params });
  }

  protected async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>('POST', endpoint, { body });
  }

  protected async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', endpoint, { body });
  }

  protected async patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>('PATCH', endpoint, { body });
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }

  protected async deleteWithBody<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>('DELETE', endpoint, { body });
  }

  async getFile(endpoint: string): Promise<Blob> {
    const url = this.getFullUrl(endpoint);
    const response$ = this.http.get(url, { responseType: 'blob' });
    return firstValueFrom(response$);
  }
}
