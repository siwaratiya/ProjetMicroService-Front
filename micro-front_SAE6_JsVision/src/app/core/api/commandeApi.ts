import {Injectable} from "@angular/core";
import {Advised} from "aspect.js";
import {ResourceService} from "../common/resource.service";

import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CommandeModel} from "../models/Commande.model";
@Injectable({
  providedIn: 'root'
})
@Advised()
export class commandeApi extends ResourceService<CommandeModel>{

  url = `${environment.apiUrl}`
  public commandeURL = '/commande-service/command/getAllCommands';
  public deleturl = '/commande-service/command/delete';
  public addUrl = '/commande-service/command/add/1';
  public updateUrl = '/commande-service/command/modify/1/{id}';


  constructor(
    private http:HttpClient
  ) {
    super(http , CommandeModel)
  }

  public createCommande(url: string, commande: CommandeModel): Observable<string | undefined> {
    this.apiURL = this.addUrl;
    return this.post(commande).pipe(
      map((commande : CommandeModel) => commande.id)
    );
  }

  public updateCommande(url: string, commande: CommandeModel): Observable<CommandeModel> {
    this.apiURL = this.updateUrl;
    return this.put(commande);
  }

  public searchCommandeById(id: string){
    this.apiURL = this.commandeURL;
    return this.getById(id);
  }

  public removeCommande(id: any): Observable<any> {
    this.apiURL = this.deleturl ;
    return this.delete(id);
  }

  public findAll(): Observable<CommandeModel[]> {
    this.apiURL = this.commandeURL;

    return this.get();
  }
}
