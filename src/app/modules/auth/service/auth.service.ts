import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api: string = 'http://localhost:8009/';

  constructor(private _http: HttpClient) { }

  public register(data: any): Observable<any>{
    return this._http.post(this.api + 'user/', data);
  }

  public login(data: any): Observable<any>{
    return this._http.post(this.api + 'login', data);
  }
}
