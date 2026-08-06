// Champs optionnels : GET /utilisateurs/profile/ (endpoint public utilisé par
// getProfile()) ne renvoie volontairement pas email/age/telephone — voir
// PublicProfileSerializer côté backend. Seul un accès admin à /utilisateurs/
// les renverrait.
export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo_profil: string;
  description: string | null;
  lien_cv: string;
  email?: string;
  age?: string | null;
  telephone?: string | null;
}