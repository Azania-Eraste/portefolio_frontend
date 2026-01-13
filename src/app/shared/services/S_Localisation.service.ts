import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { ILocalisation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_LocalisationService {
  private http = inject(HttpClient);
  // Assure-toi que cette URL existe dans ton urls.py Django
  private endpoint = `${Api.url}/localisations/`; 

  getAllLocalisations(): Observable<ILocalisation[]> {
    return this.http.get<ILocalisation[]>(this.endpoint);
  }

  // Optionnel : Récupérer une loc précise par ID
  getLocalisationById(id: number): Observable<ILocalisation> {
    return this.http.get<ILocalisation>(`${this.endpoint}${id}/`);
  }
}