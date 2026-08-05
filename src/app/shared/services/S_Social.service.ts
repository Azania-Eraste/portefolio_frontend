import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Api } from '../based/api';
import { ISocial, IPaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_SocialService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/reseaux/`;

  getAllSocials(): Observable<ISocial[]> {
    return this.http.get<IPaginatedResponse<ISocial>>(this.endpoint).pipe(
      map((response) => response.results)
    );
  }
}