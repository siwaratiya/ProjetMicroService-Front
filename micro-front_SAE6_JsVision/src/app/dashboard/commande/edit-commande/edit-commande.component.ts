import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { CommandeModel } from '../../../core/models/Commande.model';
import { CommandeService } from '../../../core/services/commande/commande.service';
import * as url from "url";

@Component({
  selector: 'app-edit-commande',
  templateUrl: './edit-commande.component.html',
  styleUrls: ['./edit-commande.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class EditCommandeComponent implements OnInit {
  @Input() modalEditCommande: boolean = true;
  @Input() selectedCommandeId: number | null = null;

  @Input() selectedUserId: number | null = null;

  @Input() CommandId: any;
  @Output() closeModalEditCommande = new EventEmitter<boolean>();
  @Output() refreshCommande = new EventEmitter<boolean>();

  public commandeForm!: FormGroup;
  public editCommandeForm!: FormGroup;

  commande: CommandeModel = new CommandeModel();
  commandeToUpdate!: any;

  constructor(
    private commandeService: CommandeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.commandeService.getcommandeById(this.CommandId).pipe(
      tap((res: any) => {
        this.commande = res;
      })
    );
    this.initForm();
  }

  initForm() {
    this.commandeForm = this.formBuilder.group({
      'notice': [this.commande.notice, Validators.required],
      'quantity_product': [this.commande.quantity_product, Validators.required],
      'nbPoduct': [this.commande.nbPoduct, Validators.required],
      'total_price': [this.commande.total_price, Validators.required],
      'date': [this.commande.date, Validators.required],
      'count_order': 0
    });
  }

  cancel() {
    this.modalEditCommande = false;
    this.closeModalEditCommande.emit(this.modalEditCommande);
  }

  editCommande() {
    if (this.selectedCommandeId !== null) {

      this.commandeToUpdate = this.commandeForm.value;
      this.commandeService.updatecommande(this.commandeToUpdate, this.selectedCommandeId).subscribe(
        (res) => {
          this.modalEditCommande = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Commande mise à jour',
            life: 3000
          });
          this.refreshCommande.emit(true);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Échec',
            detail: 'Échec de la mise à jour de la commande',
            life: 3000
          });
        }
      );
    } else {
      console.error("L'ID de la commande est null.");

    }
  }

}
