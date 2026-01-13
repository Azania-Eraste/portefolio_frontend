import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { IContact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ContactService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/contact/`;

  sendMessage(payload: IContact): Observable<any> {
    return this.http.post(this.endpoint, payload);
  }
}