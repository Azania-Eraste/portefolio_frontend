

export class Api {
  // Utilisation de static pour ne pas avoir à instancier la classe (new Base())
  // readonly pour empêcher la modification accidentelle
  static readonly url: string = 'https://mon-portefolio-api.onrender.com/api/v1';
  
  // Tu pourras ajouter d'autres config globales ici plus tard
  // ex: static readonly version = '1.0';
}