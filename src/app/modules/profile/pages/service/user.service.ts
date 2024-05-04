import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = 'http://localhost:8009/user/';
  constructor(private _http: HttpClient) {
  }
  public existUserByName(name: string): Observable<boolean> {
    return this._http.get<boolean>(this.api + 'exist_username/' + name)
  }

  public existPersonEmail(email: string): Observable<boolean> {
    return this._http.get<boolean>(this.api + 'exist_email/' + email)
  }

  public existPersonDocument(document: string): Observable<boolean> {
    return this._http.get<boolean>(this.api + 'exist_document/' + document)
  }
}
