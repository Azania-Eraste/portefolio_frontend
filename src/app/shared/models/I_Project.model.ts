import { ILanguage } from "./I_Language.model";

export interface IProject {
  id: number;
  utilisateur: number; // ID de l'utilisateur
  titre: string;
  resume: string;
  type_de_projet: string;
  languages: ILanguage[];
  image: string;
  lien: string;
}