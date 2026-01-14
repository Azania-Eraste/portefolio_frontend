import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Api } from '../based/api'; // Vérifie que c'est le bon fichier pour l'URL
// Assure-toi d'importer le bon modèle (Utilisateur ou IUser selon ton fichier models)
import { IUser } from '../models'; 

@Injectable({
  providedIn: 'root'
})
export class S_UserService {
  // 1. Injection moderne (plus propre que le constructeur)
  private http = inject(HttpClient);

  // 2. Définition propre de l'URL
  private endpoint = `${Api.url}/utilisateurs/`;

  // 3. Le Signal d'état de chargement
  isProfileLoaded = signal<boolean>(false);

  constructor() { }

  getProfile(): Observable<IUser[]> {
    // On utilise this.endpoint pour être propre
    return this.http.get<IUser[]>(this.endpoint).pipe(
      tap(() => {
        // 4. Correction ici : setTimeout prend un nombre, pas "800ms"
        setTimeout(() => {
           this.isProfileLoaded.set(true);
        }, 800); // Juste le chiffre 800 (millisecondes)
      })
    );
  }
}