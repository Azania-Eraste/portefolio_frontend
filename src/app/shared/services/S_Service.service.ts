import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Api } from '../based/api';
import { IService, IPaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ServiceService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/services/`;

  getAllServices(): Observable<IService[]> {
    return this.http.get<IPaginatedResponse<IService>>(this.endpoint).pipe(
      map((response) => response.results)
    );
  }

  // Utile si tu veux filtrer les services par type (ex: "Développement", "DevOps")
  // Cela suppose que ton backend supporte le filtrage par query param
  getServicesByType(type: string): Observable<IService[]> {
    return this.http.get<IPaginatedResponse<IService>>(`${this.endpoint}?type_de_service=${type}`).pipe(
      map((response) => response.results)
    );
  }
}