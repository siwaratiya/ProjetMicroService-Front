import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {CommandeService} from "../../../core/services/commande/commande.service";
import {AccountService} from "../../../core/services/user/account.service";

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AddCommandeComponent implements OnInit {

  @Input() modalNewCommande: boolean = true
  @Output() closeModalNewCommande = new EventEmitter<boolean>();
  @Output() refreshCommande = new EventEmitter<boolean>();

  commande: any;
  public commandeForm!: FormGroup;
  id!:any;

  constructor(
    private commandeService: CommandeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.id = this.accountService.getAccoutDto().id;
    this.initForm();
  }


  initForm() {
    this.commandeForm = this.formBuilder.group({
      'idA':this.id,
      'date': ['', Validators.required],
      'notice': ['', Validators.required],
      'quantity_product': ['', Validators.required],
      'nbPoduct': ['', Validators.required],
      'total_price': ['', Validators.required],


    })
  }


  getSeverity(status: string): any {
    switch (status) {
      case 'EQUIPMENT':
        return 'success';
      case 'Reagent':
        return 'warning';
    }
  }

  addNewCommande() {
    this.commande = this.commandeForm.value;
    this.commande.reference = this.commandeService.generateCode(8);
    const idA = 1; // Remplacez par l'ID du compte approprié
    this.commandeService.addCommande(this.commande, idA).subscribe(res => {
      this.cancel();
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Commande Added', life: 3000});
      this.refresh();
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Commande Added', life: 3000});
    });
  }


  cancel() {
    this.modalNewCommande = false;
    this.commandeForm.reset();
    this.closeModalNewCommande.emit(this.modalNewCommande);
  }
  formatDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 4 || value.length === 7) {
      input.value = value + '-';
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) {
      // Gérez les erreurs de format ici
    }
  }
  refresh(): void {
    window.location.reload();
  }
}






