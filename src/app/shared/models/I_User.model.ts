export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  photo_profil: string;
  description: string | null;
  age: string | null;
  lien_cv: string;
  telephone: string | null;
}