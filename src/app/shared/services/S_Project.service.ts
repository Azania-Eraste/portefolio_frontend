import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Api } from '../based/api';
import { IProject, IPaginatedResponse } from '../models';
import { IProjectType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ProjectService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/projets/`;

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IPaginatedResponse<IProject>>(this.endpoint).pipe(
      map((response) => response.results)
    );
  }

  // Récupérer les types de projet exposés par le backend (endpoint non paginé)
  getProjectTypes(): Observable<IProjectType[]> {
    return this.http.get<IProjectType[]>(`${this.endpoint}types/`);
  }

  // Optionnel : récupérer les projets filtrés côté serveur (si nécessaire)
  getProjectsByType(typeKey: string): Observable<IProject[]> {
    return this.http.get<IPaginatedResponse<IProject>>(`${this.endpoint}?type_de_projet=${typeKey}`).pipe(
      map((response) => response.results)
    );
  }
  
  // Exemple d'évolutivité : récupérer un projet par ID
  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.endpoint}${id}/`);
  }
}