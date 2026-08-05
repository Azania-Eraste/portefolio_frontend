import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Api } from '../based/api';
import { ILanguage, IPaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_LanguageService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/languages/`;

  getAllLanguages(): Observable<ILanguage[]> {
    return this.http.get<IPaginatedResponse<ILanguage>>(this.endpoint).pipe(
      map((response) => response.results)
    );
  }

  getLanguageById(id: number): Observable<ILanguage> {
    return this.http.get<ILanguage>(`${this.endpoint}${id}/`);
  }
}
