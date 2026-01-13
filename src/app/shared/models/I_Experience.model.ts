import { IService } from './I_Service.model';

export interface IExperience {
  id: number;
  date_debut: string; // Format YYYY-MM-DD
  date_fin: string | null;
  role: string;
  nom_entreprise: string;
  description: string;
  type_de_contrat: string;
  services?: IService[]; // Liste des services liés
}