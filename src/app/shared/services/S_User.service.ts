import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_UserService {
  private http = inject(HttpClient);
  // Endpoint spécifique
  private endpoint = `${Api.url}/utilisateurs/`;

  getProfile(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.endpoint);
  }
} 