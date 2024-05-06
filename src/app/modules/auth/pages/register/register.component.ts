import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {AlertService} from "../../../../core/services/alert.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {existDocumentNumber, existPersonEmail, existUserName} from "../../../../core/utils/custom-validators";
import {UserService} from "../../../profile/pages/service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public  register: FormGroup = new FormGroup({});

  viewRegister: boolean = false;
  typeDocuments: any = [];
  typeOfHearingLoss: any = [];


  constructor(
    private _router: Router,
    private _alert: AlertService,
    private _auth : AuthService,
    private _user : UserService,
  ) { }

  ngOnInit(): void {
    this.initFormRegister();
    this.getHearingLoss();
    this.typeOfDocuments();
  }

  getHearingLoss(){
    this._auth.hearingLoss().subscribe({
      next : (data) => {
        this.typeOfHearingLoss = data;
      }
    })
  }

  typeOfDocuments(){
    this._auth.typeOfDocuments().subscribe({
      next : (data) => {
        this.typeDocuments = data;
      }
    })
  }

  initFormRegister(): void {
    this.register = new FormGroup({
      person_name : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      person_last_name : new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
      document_type : new FormControl(null, [Validators.required]),
      person_document : new FormControl('', {
        validators: [Validators.required, Validators.maxLength(12), Validators.minLength(8)],
        asyncValidators: [existDocumentNumber(this._user)],
        updateOn: 'change'
      }),
      person_phone : new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      person_address : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      type_of_hearing_loss : new FormControl(null, [Validators.required]),
      person_email : new FormControl('', {
        validators :[Validators.required, Validators.email, Validators.maxLength(50)],
        asyncValidators: [existPersonEmail(this._user)],
        updateOn: 'change'
      }),
      user_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(20)],
        asyncValidators: [existUserName(this._user)],
        updateOn: 'change'
      }),
      password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirm_password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
  }

  changeViewRegister(){
    this.viewRegister = !this.viewRegister;
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
          document_type : this.register.get('document_type')?.value,
          person_phone : this.register.get('person_phone')?.value,
          person_address : this.register.get('person_address')?.value,
          person_email : this.register.get('person_email')?.value,
          hearing_losses : [this.register.get('type_of_hearing_loss')?.value],
          type_of_hearing_loss : "",
          previous_treatments : "",
        }
      }
      if (data.password === this.register.get('confirm_password')?.value ){
        this._auth.register(data).subscribe({
          next: () => {
            this._alert.success("Usuario registrado ");
            this.register.reset();
            this._router.navigateByUrl("/").then();
          },
          error: ()=> {
            this._alert.error("Tenemos problemas, intentalo mas tarde");
          }
        });
      }else{
        this._alert.warning("Las contraseñas no coinciden");
      }

    }else {
      this._alert.error("Formulario no valido");
      this.register.markAllAsTouched();
    }

  }

  goBack() {
    this._router.navigateByUrl('');
  }

}
