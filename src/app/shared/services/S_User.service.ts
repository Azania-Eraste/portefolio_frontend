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

  // 3. Signaux pour l'état
  isProfileLoaded = signal<boolean>(false);
  currentUser = signal<IUser | null>(null);
  users = signal<IUser[]>([]);

  constructor() { }

  getProfile(): Observable<IUser> {
    // GET /utilisateurs/ (liste complète : email, téléphone...) est réservé aux
    // admins côté backend. /utilisateurs/profile/ est l'endpoint public dédié :
    // il ne renvoie que le profil affiché sur le portfolio, avec des champs
    // volontairement limités (voir PublicProfileSerializer).
    return this.http.get<IUser>(`${this.endpoint}profile/`).pipe(
      tap((profile) => {
        this.users.set(profile ? [profile] : []);
        this.currentUser.set(profile);
        // 4. Correction ici : setTimeout prend un nombre, pas "800ms"
        setTimeout(() => {
           this.isProfileLoaded.set(true);
        }, 1000); // Juste le chiffre 800 (millisecondes)
      })
    );
  }
}