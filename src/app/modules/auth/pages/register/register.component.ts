import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {AlertService} from "../../../../core/services/alert.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public  register: FormGroup = new FormGroup({});

  constructor(
    private _router: Router,
    private _alert: AlertService,
    private _auth : AuthService,
  ) { }

  ngOnInit(): void {
    this.initFormRegister();
  }

  initFormRegister(): void {
    this.register = new FormGroup({
      person_name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
      person_last_name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
      person_document : new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(10)]),
      person_phone : new FormControl('', [Validators.required, Validators.maxLength(10)]),
      person_address : new FormControl('', [Validators.required, Validators.maxLength(20)]),
      person_email : new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      user_name: new FormControl('',  [Validators.required, Validators.maxLength(20)]),
      password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
  }

  sendRegister() {
    if (this.register.valid) {
      const data : any = {
        user_name: this.register.get('user_name')?.value,
        password: this.register.get('password')?.value,
        person : {
          person_name : this.register.get('person_name')?.value,
          person_last_name : this.register.get('person_last_name')?.value,
          person_document : this.register.get('person_document')?.value,
          person_phone : this.register.get('person_phone')?.value,
          person_address : this.register.get('person_address')?.value,
          person_email : this.register.get('person_email')?.value,
          type_of_hearing_loss : "",
          previous_treatments : "",
        }
      }
      this._auth.register(data).subscribe({
        next: () => {
          this._alert.success("Usuario registrado ");
        },
        error: (error)=> {
          this._alert.error("Tenemos problemas, intentalo mas tarde");

        }
      });
    }else {
      this._alert.error("Formulario no valido");
      this.register.markAllAsTouched();
    }

  }

  goBack() {
    this._router.navigateByUrl('');
  }

}
