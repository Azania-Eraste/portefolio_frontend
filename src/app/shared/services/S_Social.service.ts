import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { ISocial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_SocialService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/reseaux_sociaux/`; 

  getAllSocials(): Observable<ISocial[]> {
    return this.http.get<ISocial[]>(this.endpoint);
  }
}