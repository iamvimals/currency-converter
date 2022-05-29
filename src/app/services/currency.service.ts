import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiKey: string = 'ZTIN4Pf6LHcDv1f9Sf4YDMiW9ibFfpjs';
  baseUrl: string = 'https://api.apilayer.com/exchangerates_data/';
  constructor(private http: HttpClient) {}

  convertCurrency(obj: any) {
    return this.http.get(
      `${this.baseUrl}convert?to=${obj.outputSymbol}&from=${obj.inputSymbol}&amount=${obj.inputAmount}`,
      { headers: new HttpHeaders({ apikey: this.apiKey }) }
    );
  }

  fetchCurrencySymbols() {
    return this.http.get(`${this.baseUrl}symbols`, {
      headers: new HttpHeaders({ apikey: this.apiKey })
    });
  }
}
