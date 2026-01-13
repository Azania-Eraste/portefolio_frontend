import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { IProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ProjectService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/projets/`;

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.endpoint);
  }
  
  // Exemple d'évolutivité : récupérer un projet par ID
  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.endpoint}${id}/`);
  }
}