import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../core/models/product.model";
import {CommandeService} from "../../core/services/commande/commande.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CommandeModel} from "../../core/models/Commande.model";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class CommandeComponent implements OnInit {

  Commandes: CommandeModel[] = [];
  @Input() getCommandeId : any
  addNewCommandeModal:boolean = false;
  editCommandeModal:boolean = false;

  CommandeDialog: boolean = false;

  commande!: CommandeModel;
  submitted: boolean = false;
  idA:any ;


  constructor(

    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private commandeService: CommandeService ,) {}


  ngOnInit() {
    this.commandeService.findAllCommandes().subscribe(res => {
      this.Commandes = res
      console.log(this.Commandes)

    })
  }


  openNew() {
    this.addNewCommandeModal = true;
  }




  deleteCommande(commande:CommandeModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete Commande ?' ,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commandeService.removeCommande(commande.id).subscribe(res => {
          this.Commandes.splice(commande.id, 1); // Remove the item from the array
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          this.refresh();
        })
      }
    });
  }

  hideDialog() {
    this.CommandeDialog = false;
    this.submitted = false;
  }

  getSeverity(status: string) : any {
    switch (status) {
      case 'EQUIPMENT':
        return 'success';
      case 'Reagent':
        return 'warning';
    }
  }

  EditCommande(commandeId: any) {
    this.editCommandeModal = !this.editCommandeModal;
    this.getCommandeId = commandeId; // Mettre à jour getCommandeId avec la valeur de commandeId
  }



  refresh(): void {
    window.location.reload();
  }

}
