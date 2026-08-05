import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Api } from '../based/api';
import { ICompetence, IPaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class S_CompetenceService {
  private http = inject(HttpClient);
  private endpoint = `${Api.url}/competences/`;

  getAllCompetences(): Observable<ICompetence[]> {
    return this.http.get<IPaginatedResponse<ICompetence>>(this.endpoint).pipe(
      map((response) => response.results)
    );
  }

  getCompetenceById(id: number): Observable<ICompetence> {
    return this.http.get<ICompetence>(`${this.endpoint}${id}/`);
  }

  // Filtrer par catégorie
  getCompetencesByCategory(category: string): Observable<ICompetence[]> {
    return this.http.get<IPaginatedResponse<ICompetence>>(`${this.endpoint}?categorie=${category}`).pipe(
      map((response) => response.results)
    );
  }

  // Filtrer par niveau
  getCompetencesByLevel(level: string): Observable<ICompetence[]> {
    return this.http.get<IPaginatedResponse<ICompetence>>(`${this.endpoint}?niveau=${level}`).pipe(
      map((response) => response.results)
    );
  }

  // Récupérer les catégories disponibles
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}categories/`);
  }

  // Récupérer les niveaux disponibles
  getNiveaux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}niveaux/`);
  }

  createCompetence(competence: Partial<ICompetence>): Observable<ICompetence> {
    return this.http.post<ICompetence>(this.endpoint, competence);
  }

  updateCompetence(id: number, competence: Partial<ICompetence>): Observable<ICompetence> {
    return this.http.put<ICompetence>(`${this.endpoint}${id}/`, competence);
  }

  deleteCompetence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${id}/`);
  }
}
