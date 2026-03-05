export interface ICompetence {
  id: number;
  nom: string;
  description?: string;
  categorie: string; // Langage de Programmation, Framework, Logiciel, Base de Données, Outil, Autre
  niveau: string; // Débutant, Intermédiaire, Avancé, Expert
  icone_url?: string;
  date_acquisition?: string; // Date au format ISO
  categorie_display?: string;
  niveau_display?: string;
}
