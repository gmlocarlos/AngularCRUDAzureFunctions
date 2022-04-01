import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private myAppUrl = 'https://creditcard-function.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  getCreditCards(): Observable<any> {
    return this.http.get(this.myAppUrl + 'api/getCreditCards');
  }

  deleteCreditCard(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + 'api/deleteCreditCard/' + id);
  }

  createCreditCard(creditCard: any): Observable<any> {
    return this.http.post(this.myAppUrl + 'api/createCreditCard', creditCard);
  }

  updateCreditCard(id: number, creditCard: any): Observable<any> {
    return this.http.put(this.myAppUrl + 'api/updateCreditCard/' + id, creditCard);
  }
}