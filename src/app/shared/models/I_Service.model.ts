import { ILocalisation } from './I_Localisation.model';

export interface IService {
  id: number;
  nom: string;
  detail: string;
  type_de_service: string;
  outils: string;
  localisation: ILocalisation | null;
}