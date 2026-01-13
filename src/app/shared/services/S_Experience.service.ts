import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { IExperience } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ExperienceService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/experiences/`;

  getAllExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.endpoint);
  }
}