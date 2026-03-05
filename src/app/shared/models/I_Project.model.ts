import { ILanguage } from "./I_Language.model";
import { ICompetence } from "./I_Competence.model";

export interface IProject {
  id: number;
  utilisateur: number; // ID de l'utilisateur
  titre: string;
  resume: string;
  type_de_projet: string;
  languages: ILanguage[];
  competences: ICompetence[];
  image: string;
  lien: string;
}