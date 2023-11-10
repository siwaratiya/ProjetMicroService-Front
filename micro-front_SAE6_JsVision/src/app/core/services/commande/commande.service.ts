import { Injectable } from '@angular/core';

import {commandeApi} from "../../api/commandeApi";
import {CommandeModel} from "../../models/Commande.model";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(
    private commondeApi:commandeApi
  ) {
  }
  addCommande(commande: CommandeModel, idA: number) {
    const url = '/commande-service/command/add/1/{id}'; // Utilisez l'URL personnalisée ici
    return this.commondeApi.createCommande(url, commande);
  }

  updatecommande(commande: CommandeModel, selectedCommandeId: number | null) {
    if (selectedCommandeId !== null) {
      const url = '/commande-service/command/modify/1/${selectedCommandeId}';
      return this.commondeApi.updateCommande(url, commande);
    } else {
      throw new Error("L'ID de la commande nest pas trouver.");

    }
  }



  getcommandeById(id:string){
    return this.commondeApi.searchCommandeById(id);
  }

  findAllCommandes(){
    return this.commondeApi.findAll();
  }

  removeCommande(id : number){
    return this.commondeApi.removeCommande(id);
  }

  generateCode(length: number): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

}
