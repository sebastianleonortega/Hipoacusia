import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../../../core/services/storage.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public login: FormGroup = new FormGroup({});

  constructor(
    private _router: Router,
    private _alert: AlertService,
    private _auth : AuthService,
    private _storage : StorageService
  ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.login = new FormGroup({
      user_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });
  }

  sendLogin() {
    if (this.login.valid) {
      const data : any = {
        user_name: this.login.get('user_name')?.value,
        password: this.login.get('password')?.value,
      }
      this._auth.login(data).subscribe({
        next : (resp) => {
          console.log(resp)
          this._storage.setItem('user_data', resp);
          this._storage.setItem('token', resp.token);
          this._alert.success("Bienvenido");
          this._router.navigateByUrl('/home').then();
        },
        error : () => {
          this._alert.error("Credenciales incorrectas");
        }
      })
    }else {
      this._alert.error("Datos incompletos");
      this.login.markAllAsTouched();
    }

  }
  register() {
    this._router.navigateByUrl('/register').then();
  }

  // onSubmit() {
  //   if (this.login.valid) {
  //
  //     const data: any = {
  //       email: this.login.get('email')?.value,
  //       password: this.login.get('password')?.value,
  //     }
  //     if (data.email === "doctor@gmail.com"){
  //       this.router.navigate(['medical']);
  //       this._alert.success("Bienvenido");
  //
  //     }else{
  //       this.router.navigate(['home']);
  //       this._alert.success("Bienvenido");
  //     }
  //   }
  //
  // }

}
