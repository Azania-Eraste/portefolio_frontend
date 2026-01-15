import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../based/api';
import { IProject } from '../models';
import { IProjectType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_ProjectService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/projets/`;

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.endpoint);
  }

  // Récupérer les types de projet exposés par le backend
  getProjectTypes(): Observable<IProjectType[]> {
    return this.http.get<IProjectType[]>(`${this.endpoint}types/`);
  }
  
  // Optionnel : récupérer les projets filtrés côté serveur (si nécessaire)
  getProjectsByType(typeKey: string): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.endpoint}?type_de_projet=${typeKey}`);
  }
  
  // Exemple d'évolutivité : récupérer un projet par ID
  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.endpoint}${id}/`);
  }
}