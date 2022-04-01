import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  creditCardsList: any[] = [];
  accion = 'Add';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _creditCardService: CreditCardService) {
    this.form = this.fb.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.getCreditCards();
  }

  getCreditCards() {
    this._creditCardService.getCreditCards().subscribe(data => {
      this.creditCardsList = data;
    }, error => {
      console.log(error);
    })
  }

  saveCreditCard() {
    const creditCard: any = {
      cardHolder: this.form.get('cardHolder')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    if (this.id == undefined) {
      // Add card
      this._creditCardService.createCreditCard(creditCard).subscribe(data => {
        this.toastr.success('The credit card was registered successfully!', 'Credit card registered');
        this.getCreditCards();
        this.form.reset();
      }, error => {
        this.toastr.error('Opss.. an error ocurred', 'Error')
        console.log(error);
      })
    } else {
      creditCard.id = this.id;
      // Edit card
      this._creditCardService.updateCreditCard(this.id, creditCard).subscribe(data => {
        this.form.reset();
        this.accion = 'Edit';
        this.id = undefined;
        this.toastr.info('The credit card was updated successfully!', 'Credit card updated');
        this.getCreditCards();
      }, error => {
        this.toastr.error('Opss.. an error ocurred', 'Error')
        console.log(error);
      })
    }
  }

  deleteCreditCard(id: number) {
    this._creditCardService.deleteCreditCard(id).subscribe(data => {
      this.toastr.error('The credit card was deleted successfully!', 'Credit card deleted');
      this.getCreditCards();
    }, error => {
      console.log(error);
    })
  }

  editCreditCard(tarjeta: any) {
    this.accion = 'Edit';
    this.id = tarjeta.id;
    this.form.patchValue({
      cardHolder: tarjeta.cardHolder,
      cardNumber: tarjeta.cardNumber,
      expirationDate: tarjeta.expirationDate,
      cvv: tarjeta.cvv
    })
  }
}